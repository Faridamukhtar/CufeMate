import express from "express";
import { dbInstance } from "./connection.js";
import bodyParser from 'body-parser';

const EnrollSub = express.Router();

// Middleware to parse incoming requests
EnrollSub.use(bodyParser.json());

// Get rep request status api 

EnrollSub.get('/api/EnrollSubject/', async (req, res) => {
  const {std_id,course_id} = req.query;

  try {
    ////////////////////////////////////////////QUERY//////////////////////////////////////
    /*
    INSERT INTO takes VALUES('CMPS303',0);
    */
    const result =await dbInstance.query ("INSERT INTO takes VALUES ($1, $2)",[course_id, std_id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  });

  EnrollSub.get('/api/unenroll/:id/:course', async (req, res) => {
    const {id,course} = req.params;
    try {
      const result = await dbInstance.query('delete from takes where std_id = $1 AND course_id = $2;', [id,course]);
        res.json({data: result.rows});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

  export { EnrollSub };