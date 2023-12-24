import express from "express";
import { dbInstance } from "./connection.js";
import bodyParser from 'body-parser';


const ChangeClubPass_router = express.Router();

ChangeClubPass_router.use(bodyParser.json());

ChangeClubPass_router.get('/api/GetStudentClubPass', async (req, res) => {
    const { id} = req.query;

  try {
    const result = await dbInstance.query('SELECT get_stdclub_pass($1) AS passw;', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { ChangeClubPass_router };