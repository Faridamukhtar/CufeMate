import express from "express";
import { dbInstance } from "./connection.js";
import bodyParser from 'body-parser';

const Updatelogo_router = express.Router();
Updatelogo_router.use(bodyParser.json());

Updatelogo_router.get('/api/Updatelogo/:id/:logo',async (req, res) => {

    const { id, logo} = req.params;
    try {
        const result = await dbInstance.query('UPDATE student_club SET logo = $1 WHERE std_club_id = $2', [logo, id]);
        console.log('Query result:', result);

       if (result.rowCount > 0) {
            res.json({ success: true, message: 'Logo updated successfully' });
        } else {
            res.status(404).json({ success: false, message: 'User not found or Logo not updated' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

  export { Updatelogo_router };
