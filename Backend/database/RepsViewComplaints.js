import express from "express";
import { dbInstance } from "./connection.js";

const reps_view_complaints_router=express.Router();

// major id ml login 
reps_view_complaints_router.get("/api/repsviewcomplaints/:major_id/:classs", async (req,res) =>
{
    const {major_id, classs}=req.params;
    try 
    {
        const result =await dbInstance.query ("SELECT title, content, complaint_id, complaint_date FROM complaint JOIN student ON student.std_id=complaint.std_id WHERE stat =B'0' AND major_id=$1 AND class=$2;" [major_id, classs]);
        res.json(result.rows);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export { reps_view_complaints_router};