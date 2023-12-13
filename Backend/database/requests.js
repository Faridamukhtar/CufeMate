import { dbInstance } from "./connection.js";
import express from "express";
import bodyParser from 'body-parser';

const requests_router = express.Router();
//const dbInstance = await db();
// Middleware to parse incoming requests
requests_router.use(bodyParser.json());

///////////////////////// REPS /////////////////////////
requests_router.get('/api/requests/rep/:admin_id', async (req,res) => {
    const{admin_id}=req.params;
    try {
      const result = await dbInstance.query('SELECT Distinct * FROM request_rep WHERE admin_id =$1',[admin_id]);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

  requests_router.put('/api/requests/rep/approve_decline/:decision/:id', async (req, res) => {
    const {decision,id} = req.params;
    try {
        const result = await dbInstance.query('UPDATE request_rep SET stat = $1 WHERE std_id=$2;', [decision, id]);
        res.json({ success: true,user: result.rows[0], message: 'status updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
  });

  requests_router.put('/api/requests/rep/assignAdmin/:std_id', async (req, res) => {
    const {std_id} = req.params;
    try{
        const admin_id = await dbInstance.query('SELECT admin_id, COUNT(*) AS request_count FROM request_rep GROUP BY admin_id ORDER BY request_count LIMIT 1;');
        const result = await dbInstance.query('UPDATE request_rep SET admin_id = $1 WHERE std_id=$2;', [admin_id, std_id]);
        res.json({ success: true,user: result.rows[0], message: 'rep request assigned to admin successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

  ///////////////////////// CLUBS ///////////////////////
  requests_router.get('/api/requests/club/:admin_id', async (req, res) => {
    const{admin_id}=req.params;
    try {
      const result = await dbInstance.query('SELECT Distinct * FROM  request_std_club WHERE admin_id =$1',[admin_id]);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

  requests_router.put('/api/requests/club/approve_decline/:decision/:id', async (req, res) => {
    const { decision,id } = req.params;
  
    try {
      const result = await dbInstance.query('UPDATE request_std_club SET stat = $1 WHERE std_club_id=$2;', [decision, id]);
      res.json({ success: true,user: result.rows[0], message: 'status updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

  requests_router.put('/api/requests/club/assignAdmin/:std_club_id', async (req, res) => {
    const {std_club_id} = req.params;
    try{
        const admin_id = await dbInstance.query('SELECT admin_id, COUNT(*) AS request_count FROM request_std_club GROUP BY admin_id ORDER BY request_count LIMIT 1;');
        const result = await dbInstance.query('UPDATE request_std_club SET admin_id = $1 WHERE std_id=$2;', [admin_id, std_club_id]);
        res.json({ success: true,user: result.rows[0], message: 'club request assigned to admin successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });
  export { requests_router };
