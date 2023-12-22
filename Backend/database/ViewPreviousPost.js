import express from "express";
import { dbInstance } from "./connection.js";

const previous_posts_router=express.Router();


previous_posts_router.get("/api/previousposts/:std_id", async (req,res) =>{
    //const {std_id}=req.params;
    try 
    {
        const std_id=5;
        const result =await dbInstance.query (" SELECT course_name, content, post_date FROM post p JOIN requests_to_write w ON p.post_id=w.post_id JOIN related_to_course r ON p.post_id=r.post_id JOIN course c ON c.course_id=r.course_id WHERE std_id=$1;",[std_id]);
        res.json(result.rows);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export { previous_posts_router};