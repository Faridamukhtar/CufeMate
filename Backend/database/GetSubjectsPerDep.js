import express from "express";
import { dbInstance } from "./connection.js";
import bodyParser from 'body-parser';


const GetAllSub = express.Router();

GetAllSub.use(bodyParser.json());


GetAllSub.get('/api/GetAllSub', async (req, res) => {
    const {id} = req.query;
    //The Query takes the student id and get the names of all the courses in his department
    /*
    select C.course_name 
    from course C, belongs_to B, student S 
    where S.major_id = B.major_id and B.course_id= C.course_id and s.std_id=0;
    */
  try {
    const result = await dbInstance.query('SELECT C.course_id , C.course_name FROM course C, belongs_to B, student S WHERE S.major_id = B.major_id AND B.course_id= C.course_id AND s.std_id=$1;', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { GetAllSub };