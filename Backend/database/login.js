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

// Login API
router.get('/api/login', async (req, res) => {
  const {email, password} = req.body;

  try {
    const result = await pool.query('SELECT * FROM Students WHERE email = $1 AND password = $2', [email, password]);

    if (result.rows.length === 1) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
