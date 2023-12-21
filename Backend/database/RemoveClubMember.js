import express from "express";
import { dbInstance } from "./connection.js";
import bodyParser from 'body-parser';

const RemoveMember = express.Router();

RemoveMember.use(bodyParser.json());


RemoveMember.get('/api/RemoveMember', async (req, res) => {
    const { id, std_club_id, year } = req.query;

    // The Query takes the student club id and gets the amount of members during this year
    /*
    DELETE FROM ismember
    WHERE std_id = $1 AND std_club_id = $2 AND yr = $3;
    */
    try {
        const result = await dbInstance.query('DELETE FROM ismember WHERE std_id = $1 AND std_club_id = $2 AND yr = $3;', [id, std_club_id, year]);

        if (result.rowCount > 0) {
            res.json({ message: 'User deleted' });
        } else {
            res.json({ message: 'User not found or not deleted' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export { RemoveMember };