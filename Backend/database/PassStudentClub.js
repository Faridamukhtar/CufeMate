import express from "express";
import { db } from "./connection.js";
import bodyParser from 'body-parser';


const ChangeClubPass_router = express.Router();
const dbInstance = await db();

ChangeClubPass_router.use(bodyParser.json());

ChangeClubPass_router.get('/api/GetStudentClubPass', async (req, res) => {
    const { email} = req.query;

  try {
    const result = await dbInstance.query('SELECT passw FROM student_club WHERE email= $1', [email]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { ChangeClubPass_router };