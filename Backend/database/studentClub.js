import { dbInstance } from "./connection.js";
import express from "express";
import bodyParser from 'body-parser';
const club_router = express.Router();
// Middleware to parse incoming requests
club_router.use(bodyParser.json());

club_router.get('/api/login/studentClub/:email/:password', async (req, res) => {
  const { email, password } = req.params;

  try {
    const result = await dbInstance.query('SELECT * FROM studentClub WHERE email = $1 AND passw = $2', [email, password]);

    if (result.rows.length === 1) {
      res.json({ success: true, user: result.rows[0],message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

club_router.post('/api/signup/studentClub',async (req, res) => {
  const { std_club_id, std_club_name, email, passw, about , logo} = req.body;
  
  try {
    // Check if the id or email is already taken
    const existingUser = await dbInstance.query('SELECT * FROM studentClub WHERE std_club_id = $1 OR email = $2', [std_club_id, email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    // Insert the new club into the database
    const result = await dbInstance.query('INSERT INTO studentClub (std_club_id, std_club_name, email, passw, about,logo) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *',
      [std_club_id, std_club_name, email, passw, about,logo]);
    
    res.json({ success: true, user: result.rows[0], message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

  //////////////////////

export { club_router };

