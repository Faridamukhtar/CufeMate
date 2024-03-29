import express from "express";
import { dbInstance } from "./connection.js";

const stats_router = express.Router();

/////////////////////////////////// CLUBS /////////////////////////////////
// detailed query
stats_router.get('/api/stats/clubs/membersInClubs', async (req,res) => {
  try {
    const result = await dbInstance.query('select d.std_club_name,d.std_club_id,s.fname,s.lname,b.yr from (student s NATURAL JOIN ismember b) JOIN student_club d on b.std_club_id= d.std_club_id ORDER BY std_club_name,yr,fname,lname ;');
    res.json({data:result.rows});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});

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
stats_router.get('/api/stats/studentsInMajors', async (req,res) => { //stored proc
  try {
    const result = await dbInstance.query('select getStudentsInMajors();');
    console.log("result",result.rows);
    // Map the rows to a more structured format using a parsing function
    const studentsInMajors = result.rows.map(row => parseStudentsInMajors(row.getstudentsinmajors));
    // Log the mapped result to inspect the transformation
    console.log("studentsinmajors",studentsInMajors);
    res.json({ data: studentsInMajors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

stats_router.get('/api/stats/StudentsInClasses', async (req, res) => { //stored proc
  try {
    const result = await dbInstance.query('SELECT getStudentsInClasses();');
    // Map the rows to a more structured format using a parsing function
    const studentsInClasses = result.rows.map(row => parseStudentsInClasses(row.getstudentsinclasses));
    // Log the mapped result to inspect the transformation
    //console.log(studentsInClasses);

    res.json({ data: studentsInClasses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Parsing function for the result string
function parseStudentsInClasses(str) {
  const [std_count, label] = str.slice(1, -1).split(',');

  return {
    std_count: parseInt(std_count),
    label: parseInt(label),
  };
}

function parseStudentsInMajors(str) {
  const [std_count, label] = str.slice(1, -1).split(',');

  return {
    std_count: parseInt(std_count),
    label,
  };
}


export { stats_router };
