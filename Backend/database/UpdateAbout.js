import express from "express";
import { dbInstance } from "./connection.js";
import bodyParser from 'body-parser';

const Update_About = express.Router();


// Middleware to parse incoming requests
Update_About.use(bodyParser.json());

// Update_pass API

Update_About.get('/api/UpdateAbout/:email/:about', async (req, res) => {
    const {email,about}=req.params;

    console.log('Updating about for email:', email, 'with about:', about);

    try {
        const result = await dbInstance.query('UPDATE student_club SET about = $1 WHERE email = $2', [about, email]);
        console.log('Query result:', result);

       if (result.rowCount > 0) {
            res.json({ success: true, message: 'About updated successfully' });
        } else {
            res.status(404).json({ success: false, message: 'User not found or About not updated' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }

});




export { Update_About };
