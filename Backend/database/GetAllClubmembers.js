import express from "express";
import { dbInstance } from "./connection.js";
import bodyParser from 'body-parser';


const GetClubMembers = express.Router();

GetClubMembers.use(bodyParser.json());


GetClubMembers.get('/api/GetClubMembers', async (req, res) => {
    const {id} = req.query;
    //The Query takes the student club id and get the names and ids of all the members that are currently in it during this year
    /*
    SELECT student.std_id , student.fname , student.lname 
    FROM student
    JOIN ismember ON student.std_id = ismember.std_id
    WHERE ismember.std_club_id = $1
    AND ismember.yr = EXTRACT(YEAR FROM CURRENT_DATE)
    */
  try {
    const result = await dbInstance.query('SELECT student.std_id , student.fname , student.lname FROM student JOIN ismember ON student.std_id = ismember.std_id WHERE ismember.std_club_id = $1 AND ismember.yr = EXTRACT(YEAR FROM CURRENT_DATE);', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { GetClubMembers };