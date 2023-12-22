import express from "express";
import { db } from "./connection.js";

const update_complaint_status_router=express.Router();
const dbInstance = await db();

update_complaint_status_router.get("/api/updatecomplaintsstatus/:stdrep_id/:title/:content", async (req,res) =>
{   const {stdrep_id,title,content}=req.params;
    try 
    {
        const result =await dbInstance.query ("UPDATE complaint SET stat=B'1' , stdrep_id=$1 WHERE title=$2 AND content=$3 ;", [stdrep_id,title,content]);
        res.json(result.rows);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export { update_complaint_status_router};