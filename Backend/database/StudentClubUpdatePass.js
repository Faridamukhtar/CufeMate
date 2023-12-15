import express from "express";
import { dbInstance } from "./connection.js";
import bodyParser from 'body-parser';


const UpdateClubPass_router = express.Router();

UpdateClubPass_router.use(bodyParser.json());


UpdateClubPass_router.get('/api/UpdateStudentClubPassword/', async (req, res) => {
    const { id, password: newPassword } = req.query;
    
    try {
        const result = await dbInstance.query('UPDATE student_club SET passw = $1 WHERE std_club_id = $2', [newPassword, id]);
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


export { UpdateClubPass_router };