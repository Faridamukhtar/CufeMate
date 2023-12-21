import express from "express";
import { dbInstance } from "./connection.js";

const reps_view_complaints_router=express.Router();


reps_view_complaints_router.get("/api/repsviewcomplaints/", async (req,res) =>
{
    try 
    {
        const result =await dbInstance.query ("SELECT title, content FROM complaint WHERE stat =0;");
        res.json(result.rows);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export { reps_view_complaints_router};