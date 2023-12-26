import express from "express";
import { dbInstance } from "./connection.js";

const mark_read_router=express.Router();


mark_read_router.get("/api/markread/:std_id/:complaint_id", async (req,res) =>{
    const {std_id, complaint_id, }=req.params;
    try 
    {
        const result =await dbInstance.query ("UPDATE complaint SET stat=B'1', stdrep_id=$1 WHERE complaint_id=$2", [std_id, complaint_id]);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export { mark_read_router};