import express from "express";
import { dbInstance } from "./connection.js";
import bodyParser from 'body-parser';


const Pass_router = express.Router();

Pass_router.use(bodyParser.json());

// Get majors from the database
/*Pass_router.get('/api/GetPass', async (req, res) => {
    const { email} = req.body;

  try {
    const result = await dbInstance.query('SELECT passw FROM student WHERE email= $1', [email]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});*/


Pass_router.get('/api/GetPass', async (req, res) => {
    const { id} = req.query;

  try {
    const result = await dbInstance.query('SELECT passw FROM student WHERE std_id= $1', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { Pass_router };