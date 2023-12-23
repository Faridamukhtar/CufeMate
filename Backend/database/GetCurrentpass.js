import express from "express";
import { dbInstance } from "./connection.js";
import bodyParser from 'body-parser';


const Pass_router = express.Router();

Pass_router.use(bodyParser.json());


Pass_router.get('/api/GetPass', async (req, res) => {
    const { id} = req.query;

  try {
    const result = await dbInstance.query('SELECT Get_student_pass ($1) As passw;', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { Pass_router };