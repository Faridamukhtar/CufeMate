import express from "express";
import { db } from "./connection.js";
import bodyParser from 'body-parser';

const signup_router = express.Router();
const dbInstance = await db();
// Middleware to parse incoming requests
signup_router.use(bodyParser.json());

// SignUp API

signup_router.post('/api/signup/student', async (req, res) => {
    const {Std_ID,Fname,Lname,Email,Major_ID,Passw,studentC} = req.body;
  
    try {
      // Check if the username or email is already taken
      const existingUser = await dbInstance.query('SELECT * FROM student WHERE std_id = $1 Union SELECT * FROM student WHERE email = $2',[Std_ID , Email]);
  
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ success: false, message: 'user already exists' });
      }
      
      // Insert the new user into the database
      const repFlag = 0; //set Rep_Flag to 0 by default
      const result = await dbInstance.query('INSERT INTO student (std_id, fname, lname, email, passw, major_id, rep_flag, class) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *',
          [Std_ID, Fname, Lname, Email,Passw, Major_ID, repFlag, studentC]);
      res.json({ success: true, user: result.rows[0], message: 'Signup successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

  /*signup_router.post('/api/signup/student/:std_id/:fname/:lname/:email/:passw/:major_id/:studentClass', async (req, res) => {
    const { std_id, fname, lname, email,passw, major_id, studentClass } = req.params;
  
    try {
        // Check if the user already exists
        const existingUser = await dbInstance.query('SELECT * FROM student WHERE std_id = $1 Union SELECT * FROM student WHERE email = $2',[std_id , email]);
  
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
      
        // Insert the new user into the database
        const repFlag = 0; //set Rep_Flag to 0 by default
        const result = await dbInstance.query('INSERT INTO student (std_id, fname, lname, email, passw, major_id, rep_flag, class) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *',
            [std_id, fname, lname, email,passw, major_id, repFlag, studentClass]);
  
        res.json({ success: true, user: result.rows[0], message: 'Signup successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});*/

  export { signup_router };