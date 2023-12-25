import express from "express";
import { dbInstance } from "./connection.js";

const mark_reject_router=express.Router();


mark_reject_router.get("/api/markreject/:std_id/:post_id", async (req,res) =>{
    const {std_id,post_id}=req.params;
    try 
    {
        const result =await dbInstance.query ("UPDATE requests_to_write SET flagstatus=0, stdrep_id=$1 WHERE post_id=$2;", [std_id, post_id]);
        
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export { mark_reject_router};