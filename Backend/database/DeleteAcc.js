import express from "express";
import { db } from "./connection.js";
import bodyParser from 'body-parser';

const Delete_acc = express.Router();
const dbInstance = await db();


// Middleware to parse incoming requests
Delete_acc.use(bodyParser.json());

// Update_pass API
Delete_acc.get('/api/DeleteAcc', async (req, res) => {
    const { email} = req.body;

    try {
        const result = await dbInstance.query('DELETE FROM student  WHERE email = $1', [email]);
    
        if (result.rowCount > 0 && result.command === 'DELETE') {
            res.json({ success: true, message: 'User Deleted updated successfully' });
        } else {
          res.status(404).json({ success: false, message: 'User not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
  
});





export { Delete_acc };