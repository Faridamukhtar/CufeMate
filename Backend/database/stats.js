import express from "express";
import { dbInstance } from "./connection.js";

const stats_router = express.Router();

/////////////////////////////////// CLUBS /////////////////////////////////
// detailed
stats_router.get('/api/stats/clubs/membersInClubs', async (req,res) => {
  try {
    const result = await dbInstance.query('select s.fname , s.lname , d.std_club_name, COUNT(*)  from (student s NATURAL JOIN ismember b) JOIN student_club d ON b.std_club_id = d.std_club_id GROUP BY d.std_club_name, b.yr ORDER BY d.std_club_name,s.fname,s.lname;');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});
// managerial 
// avg rating
stats_router.get('/api/stats/clubs/avgRating', async (req,res) => {
  try {
    const result = await dbInstance.query('select std_club_id, avg(rating) from rate GROUP BY yr ORDER BY std_club_id;');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// top rated each year
/*stats_router.get('/api/stats/clubs/topRated', async (req,res) => {
  try {
    const result = await dbInstance.query('select std_club_id, max(rating) from rate GROUP BY yr;');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});*/
///////////////////////////////// REPS //////////////////////////////////////
// detailed
// all posts by reps
stats_router.get('/api/stats/reps/posts', async (req,res) => {
  try {
    const result = await dbInstance.query('SELECT r.fname, r.lname, r.std_id, p.post_id, p.content p.post_date FROM (post p natural join writes w) JOIN student d ON d.std_id = w.std_id ORDER BY r.fname, r.lname p.post_date;');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export { stats_router };
