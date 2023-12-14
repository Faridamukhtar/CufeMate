import { dbInstance} from "./connection.js";
import express from "express";
import bodyParser from 'body-parser';

const login_router = express.Router();
// Middleware to parse incoming requests
login_router.use(bodyParser.json());

// Login API
/*login_router.get('/api/login/student', async (req, res) => {
  const {email, password} = req.body;

  try {
    const result = await dbInstance.query('SELECT * FROM Student WHERE email = $1 AND passw = $2', [email, password]);

    if (result.rows.length === 1) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});*/
login_router.get('/api/login/student/:email/:password', async (req, res) => {
  const { email, password } = req.params;

  try {
    const result = await dbInstance.query('SELECT * FROM Student WHERE email = $1 AND passw = $2', [email, password]);

    if (result.rows.length === 1) {
      res.json({ success: true,user: result.rows[0], message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
export { login_router };

