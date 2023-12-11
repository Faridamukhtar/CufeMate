import express from "express";
import { db } from "./connection.js";
import bodyParser from 'body-parser';

const Update_Pass = express.Router();
const dbInstance = await db();


// Middleware to parse incoming requests
Update_Pass.use(bodyParser.json());

// Update_pass API
/*Update_Pass.get('/api/UpdatePassword/', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const result = await dbInstance.query('UPDATE student  SET passw = $1 WHERE email = $2', [newPassword, email]);
    
        if (result.rowCount > 0) {
            res.json({ success: true, message: 'Password updated successfully' });
        } else {
          res.status(404).json({ success: false, message: 'User not found or password not updated' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
  
});*/

Update_Pass.get('/api/UpdatePassword/', async (req, res) => {
    const { email, password: newPassword } = req.query;
    
    console.log('Updating password for email:', email, 'with new password:', newPassword);

    try {
        const result = await dbInstance.query('UPDATE student SET passw = $1 WHERE email = $2', [newPassword, email]);
        console.log('Query result:', result);

       if (result.rowCount > 0) {
            res.json({ success: true, message: 'Password updated successfully' });
        } else {
            res.status(404).json({ success: false, message: 'User not found or password not updated' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

});




export { Update_Pass };

