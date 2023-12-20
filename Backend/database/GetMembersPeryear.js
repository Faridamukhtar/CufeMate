import express from "express";
import { dbInstance } from "./connection.js";
import bodyParser from 'body-parser';


const GetClubMembersperyear = express.Router();

GetClubMembersperyear.use(bodyParser.json());


GetClubMembersperyear.get('/api/GetClubMembersperyear', async (req, res) => {
    const {id,year} = req.query;

    //The Query takes the student club id and get the amount of members during this year
    /*
    SELECT COUNT(*)
    FROM ismember
    WHERE ismember.std_club_id = $1
    AND ismember.yr = $2
    */
  try {
    const result = await dbInstance.query('SELECT COUNT(*) FROM ismember WHERE ismember.std_club_id = $1 AND ismember.yr = $2  ;', [id,year]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { GetClubMembersperyear };