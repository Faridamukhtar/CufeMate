import express from "express";
import { dbInstance } from "./connection.js";

const req_write_post_major_router=express.Router();
// el mafroud el post id yeb2a auto generated w auto incremented 
// el mafroud el student id wel major id yeb2ou ma3aya ml login 
req_write_post_major_router.get("/api/reqwritepostmajor/:content/:major_id/:std_id", async (req,res) =>{
    const {content, major_id, std_id}=req.params;
    //const post_id=121;
    const today=new Date();
    const post_date=today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    try 
    {
        const result1=await dbInstance.query ("INSERT INTO post( content, post_date) VALUES ($1, $2);",[ content, post_date]);
        const post_id = await dbInstance.query ("SELECT MAX(post_id) FROM post;");
        const result2=await dbInstance.query ("INSERT INTO requests_to_write(post_id, std_id, flagstatus) VALUES ($1,$2, 0);", [post_id.rows[0].max, std_id]);
        const result3=await dbInstance.query ("INSERT INTO related_to_major(post_id,major_id) VALUES ($1,$2);",[post_id.rows[0].max,major_id]);
        res.json({res1: result1.rows , res2: result2.rows,res3:result3.rows});
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export { req_write_post_major_router};



