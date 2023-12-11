import express from "express";
import { db } from "./connection.js";

const write_complaint_router=express.Router();
const dbInstance = await db();

write_complaint_router.get("/api/writecomplaint/:title/:content", async (req,res) =>{
    const {title,content}=req.params;
    const complaint_id=1200;
    const std_id=5;
    const stdrep_id=4;
    const stat=0;
    try 
    {
        const result =await dbInstance.query ("INSERT INTO complaint (title, content, complaint_id, std_id, stdrep_id , stat) VALUES ($1, $2, $3 ,$4 , $5, $6 )",[title, content, complaint_id, std_id, stdrep_id, stat]);
        res.json(result.rows);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export { write_complaint_router};