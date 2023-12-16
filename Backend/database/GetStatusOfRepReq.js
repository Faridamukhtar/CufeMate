import express from "express";
import { dbInstance } from "./connection.js";
import bodyParser from 'body-parser';

const Getrepreqstatus = express.Router();

// Middleware to parse incoming requests
Getrepreqstatus.use(bodyParser.json());

// Get rep request status api 

Getrepreqstatus.get('/api/get_rep_req_stat/', async (req, res) => {
  const {std_id} = req.query;

  try {
    const result = await dbInstance.query('SELECT stat FROM request_rep WHERE std_id= $1', [std_id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  });

  export { Getrepreqstatus };