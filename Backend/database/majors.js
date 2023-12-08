const express = require('express');
const { Pool } = require('pg');

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

// Get majors from the database
router.get('/api/majors', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM majors');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
