import express from "express";
import { dbInstance } from "./connection.js";
import bodyParser from 'body-parser';


const ChangeAdminPass_router = express.Router();

ChangeAdminPass_router.use(bodyParser.json());

ChangeAdminPass_router.get('/api/GetAdminsPass', async (req, res) => {
    const { email} = req.query;

  try {
    const result = await dbInstance.query('SELECT passw FROM admins WHERE email= $1', [email]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { ChangeAdminPass_router };