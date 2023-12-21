import express from "express";
import { dbInstance } from "./connection.js";

const stats_router = express.Router();

/////////////////////////////////// CLUBS /////////////////////////////////
// detailed query
/*stats_router.get('/api/stats/clubs/membersInClubs', async (req,res) => {
  try {
    const result = await dbInstance.query('select s.fname , s.lname , d.std_club_name, COUNT(*)  from (student s NATURAL JOIN ismember b) JOIN student_club d ON b.std_club_id = d.std_club_id GROUP BY d.std_club_name, b.yr ORDER BY d.std_club_name,s.fname,s.lname;');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});*/

// detailed stored proc
/*stats_router.get('/api/stats/clubs/membersInClubs', async (req, res) => {
  try {
    const result = await dbInstance.func('get_members_in_clubs');
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});*/

// managerial 
// avg rating
stats_router.get('/api/stats/clubs/avgRating/:yr', async (req,res) => {
  const {yr} = req.params;
  try {
    const result = await dbInstance.query('select std_club_name , std_club_id, avg(rating) as avg_rate from rate NATURAL JOIN student_club WHERE yr =$1 GROUP BY std_club_id, std_club_name;',[yr]);
    res.json({data:result.rows});
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
    const result = await dbInstance.query('SELECT r.fname, r.lname, r.std_id, p.post_id, p.content , p.post_date FROM (post p natural join writes w) JOIN student r ON r.std_id = w.std_id ORDER BY r.fname, r.lname, p.post_date;');
    res.json({data:result.rows});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// managerial 
//activity metric -> to be divided by 4
stats_router.get('/api/stats/reps/activityMetric/:year/:month', async (req,res) => {
  const {year, month} = req.params;
  try {
    const result = await dbInstance.query('SELECT count(*)/4 as weekly_avg, s.fname, s.std_id FROM (post p natural join writes w) JOIN student s ON s.std_id = w.std_id WHERE EXTRACT(YEAR FROM post_date) = $1 AND EXTRACT(MONTH FROM post_date) = $2 GROUP BY s.std_id;',[year,month]);
    res.json({data:result.rows});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

///////////////////////////// STUDENTS /////////////////////////
// managerial 
// count of students in each major
stats_router.get('/api/stats/studentsInMajors', async (req,res) => {
  try {
    const result = await dbInstance.query('SELECT count(*) as std_count, Major_Name FROM student NATURAL JOIN major GROUP BY Major_Name');
    res.json({data:result.rows});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
/*stats_router.get('/api/stats/LastManagerial', async (req,res) => {
  try {
    const result = await dbInstance.query('SELECT count(*) as std_count, Major_Name FROM student NATURAL JOIN major GROUP BY Major_Name');
    res.json({data:result.rows});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});*/

export { stats_router };
