import { db } from "./connection.js";
import express from "express";
import bodyParser from 'body-parser';

const login_router = express.Router();
const dbInstance = await db();
// Middleware to parse incoming requests
login_router.use(bodyParser.json());

// Login API
login_router.get('/api/login/student/:email/:password', async (req, res) => {
  const { email, password } = req.params;

  try {
    const result = await dbInstance.query('SELECT * FROM Students WHERE email = $1 AND password = $2', [email, password]);

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


export { login_router };
