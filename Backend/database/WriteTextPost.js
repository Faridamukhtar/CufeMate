import express from "express";
import { dbInstance } from "./connection.js";

const write_post_router=express.Router();
// el mafroud el post id yeb2a auto generated w auto incremented 
// el mafroud el student id wel major id yeb2ou ma3aya ml login 
write_post_router.get("/api/writepost/:content/:course_id", async (req,res) =>{
    const {content, course_id}=req.params;
    const post_id=111;
    const today=new Date();
    const post_date=today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    const std_id=5;
    const major_id='CCEC';
    try 
    {
        const result1=await dbInstance.query ("INSERT INTO post(post_id, content, post_date) VALUES ($1, $2,$3);",[post_id, content, post_date]);
        const result2=await dbInstance.query ("INSERT INTO writes(post_id, std_id) VALUES ($1,$2);", [post_id, std_id]);
        const result3=await dbInstance.query ("INSERT INTO related_to_course(post_id,course_id) VALUES ($1,$2);",[post_id, course_id]);
        const result4=await dbInstance.query ("INSERT INTO related_to_major(post_id,major_id) VALUES ($1,$2);",[post_id,major_id]);
        res.json({res1: result1.rows , res2: result2.rows,res3:result3.rows, res4:result4.rows});
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export { write_post_router};



