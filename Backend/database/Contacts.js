import express from "express";
import { db } from "./connection.js";

const reps_contacts_router=express.Router();
const dbInstance = await db();

reps_contacts_router.get("/api/repscontacts/:major/:class", async (req,res) =>
{
    //const {std_id}=req.params;
    //const {std_major}=req.params;
    try 
    {
        const major='CCEC';
        const classs=2025;
        const result =await dbInstance.query ("SELECT fname, lname, email FROM student WHERE major_id=$1 AND class=$2 AND rep_flag= 1;",[major,classs]);
        res.json(result.rows);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export { reps_contacts_router};