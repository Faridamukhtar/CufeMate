import express from "express";
import { dbInstance } from "./connection.js";
import bodyParser from 'body-parser';


const ChangeClubPass_router = express.Router();

ChangeClubPass_router.use(bodyParser.json());

ChangeClubPass_router.get('/api/GetStudentClubPass', async (req, res) => {
    const { id} = req.query;

  try {
    const result = await dbInstance.query('SELECT passw FROM student_club WHERE std_club_id= $1', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { ChangeClubPass_router };