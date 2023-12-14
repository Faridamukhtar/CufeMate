import express from "express";
import { dbInstance } from "./connection.js";

const stats_router = express.Router();

// Get majors from the database
stats_router.get('/api/majors', async (req,res) => {
  try {
    const result = await dbInstance.query('SELECT * FROM major');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { stats_router };
