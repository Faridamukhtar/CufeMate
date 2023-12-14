import { dbInstance } from "./connection.js";
import express from "express";
import bodyParser from 'body-parser';
const club_router = express.Router();

// Middleware to parse incoming requests
club_router.use(bodyParser.json());

club_router.get('/api/login/student_club/:email/:password', async (req, res) => {
  const { email, password } = req.params;

  try {
    const result = await dbInstance.query('SELECT * FROM (student_club NATURAL JOIN request_std_club ) WHERE email = $1 AND passw = $2 AND stat = 1', [email, password]);

    if (result.rows.length === 1) {
      res.json({ success: true, user: result.rows[0],message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password or request is not approved yet' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

club_router.post('/api/signup/student_club',async (req, res) => {
  const { std_club_id, std_club_name, email, passw, about , logo} = req.body;
  
  try {
    // Check if the id or email is already taken
    const existingUser = await dbInstance.query('SELECT * FROM student_club WHERE std_club_id = $1 OR email = $2', [std_club_id, email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    // Insert the new club into the database
    const result = await dbInstance.query('INSERT INTO student_club (std_club_id, std_club_name, email, passw, about,logo) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *',
      [std_club_id, std_club_name, email, passw, about,logo]); 
    res.json({ success: true, user: result.rows[0], message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
club_router.post('/api/send/request/student_club',async (req, res) => {
  const {std_club_id} = req.body;
  
  try {
    // Check if the id or email is already taken
    const existingUser = await dbInstance.query('SELECT * FROM request_std_club WHERE std_club_id = $1', [std_club_id]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'request already sent, user exists' });
    }
    // Insert the new club into the database
    const result = await dbInstance.query('INSERT INTO request_std_club (std_club_id, stat) VALUES ($1,0) RETURNING *',
      [std_club_id]); 
    res.json({ success: true, user: result.rows[0], message: 'request sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
  //////////////////////

export { club_router };

