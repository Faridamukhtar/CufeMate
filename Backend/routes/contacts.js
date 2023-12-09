import express from "express";
import { db } from "./connection.js";

const contacts_router=express.Router();

contacts_router.get('/api/contacts', async (req,res) => {
   try 
   {
    const result = await db.query ('SELECT fname, lname, email FROM student WHERE rep_flag=1');
    res.json(result.rows);
   }
   catch (error)
   {
    console.error(error);
    res.status(500).json({error:'Internal Server Error'});
   }


} );

export { contacts_router };






