import express from "express";
import { db } from "./connection.js";

const previous_complaints_router=express.Router();

previous_complaints_router.get("/api/previouscomplaints", async (req,res) =>{
    try 
    {
        const result =await db.query ("SELECT title, complaint_id, content, std_id, stat_id FROM complaint ");
        res.json(result.rows);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export { previous_complaints_router};