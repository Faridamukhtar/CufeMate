import { dbInstance } from "./connection.js";
import express from "express";
import bodyParser from 'body-parser';
const logo = express.Router();
// Middleware to parse incoming requests
logo.use(bodyParser.json());

/*logo.get('/api/studentClub/:id/logo', async (req, res) => {
    try {
      const stdClubId = req.params.id;
      const result = await dbInstance.query('SELECT logo FROM student_club WHERE std_club_id = $1', [stdClubId]);
      
      if (result.rows.length > 0) {
        const logoData = result.rows[0].logo;
        res.send({ logoData });
      } else {
        res.status(404).send('Image not found');
      }
    } catch (error) {
      console.error('Error retrieving image:', error);
      res.status(500).send('Internal Server Error');
    }
  });*/
  logo.get('/api/studentClub/:id/logo', async (req, res) => {
    try {
      const stdClubId = req.params.id;
      const result = await dbInstance.query('SELECT logo FROM studentClub WHERE std_club_id = $1', [stdClubId]);
      
      if (result.rows.length > 0) {
        const logoData = result.rows[0].logo;
        res.send({ logoData });
      } else {
        res.status(404).send('Image not found');
      }
    } catch (error) {
      console.error('Error retrieving image:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  export { logo };