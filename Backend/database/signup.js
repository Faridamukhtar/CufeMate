const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const router = express.Router();

// Configure the CockroachDB connection (adjust the connection string accordingly)
const pool = new Pool({
  user: 'your_username',
  host: 'your_hostname',
  database: 'your_database',
  password: 'your_password',
  port: 26257,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Middleware to parse incoming requests
router.use(bodyParser.json());

// SignUp API

router.post('/api/signup', async (req, res) => {
    const {Std_ID,Fname,Lname,Email,Major_ID,Rep_Flag,Password,Class} = req.body;
  
    try {
      // Check if the username or email is already taken
      const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ success: false, message: 'user already exists' });
      }
      
      // Insert the new user into the database
      Rep_Flag=0;
      const result = await pool.query('INSERT INTO students (Std_ID,Fname,Lname,Email,Major_ID,Rep_Flag,Password,Class) VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING *', [Std_ID,Fname,Lname,Email,Major_ID,Rep_Flag,Password,Class]);
  
      res.json({ success: true, user: result.rows[0], message: 'Signup successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

  module.exports = router;
