import express from "express";
import { dbInstance } from "./connection.js";
import bodyParser from 'body-parser';


const Subjectbystudent = express.Router();

Subjectbystudent.use(bodyParser.json());

Subjectbystudent.get('/api/student/courses/:id', async (req, res) => {
    const { id} = req.params;
  
    try {
      const result = await dbInstance.query('select * from (student natural join takes natural join course) where std_id = $1;', [id]);
        res.json({data: result.rows});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

export { Subjectbystudent };