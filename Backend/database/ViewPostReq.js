import express from "express";
import { dbInstance } from "./connection.js";

const post_requests_router=express.Router();

// el mafroud el major id yakhdo ml login 
post_requests_router.get("/api/viewpostreq/:major_id/:classs", async (req,res) =>
{
    const {major_id, classs}=req.params;
    try 
    {
        const result =await dbInstance.query ("SELECT post_date, content ,course_name, p.post_id AS pst FROM post p LEFT OUTER JOIN related_to_course rc ON rc.post_id=p.post_id LEFT OUTER JOIN course c ON c.course_id=rc.course_id JOIN requests_to_write r ON r.post_id=p.post_id AND r.flagstatus=0 JOIN student s ON s.std_id=r.std_id LEFT OUTER JOIN related_to_major rm ON rm.post_id=p.post_id WHERE s.major_id=$1 AND s.class=$2;",[major_id, classs]);
        res.json(result.rows);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export { post_requests_router};