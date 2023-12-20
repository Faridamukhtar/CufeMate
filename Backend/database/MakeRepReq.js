import express from "express";
import { dbInstance } from "./connection.js";
import bodyParser from 'body-parser';

const NewRepReq = express.Router();

// Middleware to parse incoming requests
NewRepReq.use(bodyParser.json());


NewRepReq.get('/api/Makenewrepreq/', async (req, res) => {
    const {std_id} = req.query;
  
    try {
      // Check if request is already made before
      const existingUser = await dbInstance.query('SELECT * FROM request_rep WHERE std_id = $1',[std_id]);
  
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ success: false, message: 'req already exists' });   
      }
      const result = await dbInstance.query('INSERT INTO request_rep VALUES ($1, $2, $3)', [std_id, null ,1]);
      if (result.rowCount > 0) {
      res.json({ success: true, user: result.rows[0], message: 'Request successful' });
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

  export { NewRepReq };