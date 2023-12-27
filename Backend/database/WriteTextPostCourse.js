import express from "express";
import { dbInstance } from "./connection.js";

const write_post_course_router=express.Router();
// el mafroud el post id yeb2a auto generated w auto incremented 
// el mafroud el student id wel major id yeb2ou ma3aya ml login 
write_post_course_router.get("/apiwritepostcourse/:content/:course_id/:std_/id", async (req,res) =>{
    const {content, course_id, std_id}=req.params;
    //const post_id=111;
    const today=new Date();
    const post_date=today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    try 
    {
        const result1=await dbInstance.query ("INSERT INTO post(content, post_date) VALUES ($1, $2);",[content, post_date]);
        const post_id = await dbInstance.query ("SELECT MAX(post_id) FROM post;");
        const result2=await dbInstance.query ("INSERT INTO writes(post_id, std_id) VALUES ($1,$2);", [post_id.rows[0].max, std_id]);
        const result3=await dbInstance.query ("INSERT INTO related_to_course(post_id,course_id) VALUES ($1,$2);",[post_id.rows[0].max, course_id]);
        res.json({res1: result1.rows , res2: result2.rows,res3:result3.rows});
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export { write_post_course_router};



