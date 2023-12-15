import express from "express";
import { dbInstance } from "./connection.js";

const previous_complaints_router=express.Router();


previous_complaints_router.get("/api/previouscomplaints/:std_id", async (req,res) =>{
    //const {std_id}=req.params;
    try 
    {
        const std_id=5;
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