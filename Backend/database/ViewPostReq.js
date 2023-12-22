import express from "express";
import { dbInstance } from "./connection.js";

const post_requests_router=express.Router();

// el mafroud el major id yakhdo ml login 
post_requests_router.get("/api/viewpostreq", async (req,res) =>
{
    const major_id='CCEC';
    try 
    {
        const result =await dbInstance.query ("SELECT post_date, content , course_name ,p.post_id AS pst FROM post p JOIN requests_to_write r ON p.post_id=r.post_id JOIN related_to_course c ON c.post_id=p.post_id JOIN course ON course.course_id=c.course_id JOIN related_to_major m  ON m.post_id=p.post_id  JOIN major ON major.major_id=m.major_id WHERE flagstatus=2 AND m.major_id=$1 ;",[major_id]);
        res.json(result.rows);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export { post_requests_router};