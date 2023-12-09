import express from "express";
import { db } from "./connection.js";
import bodyParser from 'body-parser';

const signup_router = express.Router();
const dbInstance = await db();
// Middleware to parse incoming requests
signup_router.use(bodyParser.json());

// SignUp API

signup_router.post('/api/signup/student', async (req, res) => {
    const {Std_ID,Fname,Lname,Email,Major_ID,Rep_Flag,Password,Class} = req.body;
  
    try {
      // Check if the username or email is already taken
      const existingUser = await dbInstance.query('SELECT * FROM users WHERE email = $1', [Email]);
  
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ success: false, message: 'user already exists' });
      }
      
      // Insert the new user into the database
      Rep_Flag=0;
      const result = await db.query('INSERT INTO students (Std_ID,Fname,Lname,Email,Major_ID,Rep_Flag,Password,Class) VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING *', [Std_ID,Fname,Lname,Email,Major_ID,Rep_Flag,Password,Class]);
  
      res.json({ success: true, user: result.rows[0], message: 'Signup successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

  export { signup_router };