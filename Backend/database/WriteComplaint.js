import express from "express";
import { dbInstance } from "./connection.js";

const write_complaint_router=express.Router();

write_complaint_router.get("/api/writecomplaint/:title/:content/:std_id", async (req,res) =>{
    const {title,content, std_id}=req.params;
    const stat=0;
    const today=new Date();
    const complaint_date=today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    try 
    {
        const result =await dbInstance.query ("INSERT INTO complaint (title, content, std_id, stat, complaint_date) VALUES ($1, $2, $3 ,$4 , $5 );",[title, content, std_id, stat, complaint_date]);
        res.json(result.rows);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export { write_complaint_router};