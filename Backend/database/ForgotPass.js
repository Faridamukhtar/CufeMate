import { dbInstance} from "./connection.js";
import express from "express";
import bodyParser from 'body-parser';

const forgotPass = express.Router();
// Middleware to parse incoming requests
forgotPass.use(bodyParser.json());

forgotPass.get('/api/forgotPass/emailCheck/:table/:email', async (req, res) => {
  const {table , email} = req.params;
  try {
    let result;
    if (table==='admins')
    {result = await dbInstance.query("SELECT * FROM admins WHERE email = $1;", [email]);}
    if (table==='student')
    {result = await dbInstance.query("SELECT * FROM student WHERE email = $1;", [email]);}
    if (table==='student_club')
    {result = await dbInstance.query("SELECT * FROM student_club WHERE email = $1;", [email]);}
    if (result.rows.length === 1) {
      res.json({ success: true,user: result.rows[0], message: 'email found' });
    } else {
      res.status(401).json({ success: false, message: 'email not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

/*forgotPass.get('/api/forgotPass/getID/:table/:email', async (req, res) => {
    const {table , email} = req.params;
    if(table ==='student')
    {
        try {
        const result = await dbInstance.query('SELECT std_id FROM $1 WHERE email = $2', [table,email]);
        res.json({ success: true,user: result.rows[0], message: 'email found' });
        } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
    if(table ==='admins')
    {
        try {
        const result = await dbInstance.query('SELECT admin_id FROM $1 WHERE email = $2', [table,email]);
        res.json({ success: true,user: result.rows[0], message: 'email found' });
        } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
    if(table ==='student_club')
    {
        try {
        const result = await dbInstance.query('SELECT std_club_id FROM $1 WHERE email = $2', [table,email]);
        res.json({ success: true,user: result.rows[0], message: 'email found' });
        } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
  });*/

  forgotPass.put('/api/forgotPass/updatePass/:table/:email/:newPass', async (req, res) => {
    const {table , email, newPass} = req.params;
    try {
      let result;
      if (table==='admins')
      {result = await dbInstance.query("update admins set passw = $1 WHERE email = $2;", [newPass,email]);}
      if (table==='student')
      {result = await dbInstance.query("update student set passw = $1 WHERE email = $2;", [newPass,email]);}
      if (table==='student_club')
      {result = await dbInstance.query("update student_club set passw = $1 WHERE email = $2;", [newPass,email]);}
        res.json({success: true,user: result.rows[0]});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

export { forgotPass };

