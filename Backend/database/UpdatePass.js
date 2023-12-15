import express from "express";
import { dbInstance } from "./connection.js";
import bodyParser from 'body-parser';

const Update_Pass = express.Router();


// Middleware to parse incoming requests
Update_Pass.use(bodyParser.json());

// Update_pass API

Update_Pass.get('/api/UpdatePassword/', async (req, res) => {
    const { id, password: newPassword } = req.query;
    

    try {
        const result = await dbInstance.query('UPDATE student SET passw = $1 WHERE std_id = $2', [newPassword, id]);
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

