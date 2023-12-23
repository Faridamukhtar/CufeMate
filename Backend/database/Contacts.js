import express from "express";
import { dbInstance } from "./connection.js";

const reps_contacts_router=express.Router();


reps_contacts_router.get("/api/repscontacts/:major/:classs", async (req,res) =>
{
    //const {std_id}=req.params;
    //const {std_major}=req.params;
    const {major,classs}= req.params;
    //const major='MEE';
    //const classs=2026;
    try 
    {
        const result =await dbInstance.query ('SELECT fname, lname, email FROM student WHERE major_id=$1 AND class=$2 AND rep_flag= 1;',[major,classs]);
        res.json(result.rows);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export { reps_contacts_router};