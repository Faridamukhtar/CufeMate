import express from "express";
import { dbInstance } from "./connection.js";

const choose_course_router=express.Router();


choose_course_router.get("/api/choosecourse/:major_id", async (req,res) =>{
   const {major_id}=req.params;
   //const major_id='CCEC';
    try 
    {
        const result =await dbInstance.query ("SELECT course.course_id, course.course_name FROM course JOIN belongs_to b ON course.course_id = b.course_id WHERE b.major_id = $1;",[major_id]);
        res.json(result.rows);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export { choose_course_router};