import express from "express";
import { db } from "./connection.js";

const previous_complaints_router=express.Router();
const dbInstance = await db();

previous_complaints_router.get("/api/previouscomplaints/:std_id", async (req,res) =>{
    const {std_id}=req.params;
    try 
    {
        const result =await dbInstance.query ("SELECT title, complaint_date, stat  FROM complaint WHERE std_id = $1;",[std_id]);
        res.json(result.rows);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export { previous_complaints_router};