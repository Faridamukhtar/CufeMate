import { dbInstance } from "./connection.js";
import express from "express";
import bodyParser from 'body-parser';

const admin_router = express.Router();
// Middleware to parse incoming requests
admin_router.use(bodyParser.json());

//////////////////////////////////////////          ADMIN            ////////////////////////////////////////////
//admin login
admin_router.get('/api/login/admin/:email/:password', async (req, res) => {
  const { email, password } = req.params;

  try {
    const result = await dbInstance.query('SELECT * FROM admins WHERE email = $1 AND passw = $2', [email, password]);

    if (result.rows.length === 1) {
      res.json({ success: true,user: result.rows[0], message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

//add admin
admin_router.post('/api/add/admin', async (req, res) => {
  const {admin_id,fname,lname,email,passw} = req.body;

  try {
    // Check if the username or email is already taken
    const existingUser = await dbInstance.query('SELECT * FROM admins WHERE admin_id = $1 Union SELECT * FROM admins WHERE email = $2',[admin_id , email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'user already exists' });
    }
    
    // Insert the new user into the database
    const result = await dbInstance.query('INSERT INTO admins (admin_id,fname,lname,email,passw) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [admin_id,fname,lname,email,passw]);
    res.json({ success: true, user: result.rows[0], message: 'adding admin successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

//////////////////////////////////////////          STUDENTS            ////////////////////////////////////////////
// students
// view all
admin_router.get('/api/admin/getAllStudents', async (req,res) => {
  try {
    const result = await dbInstance.query('SELECT Distinct * FROM student');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get 1 student info
/*admin_router.get('/api/admin/student/info/:id', async (req,res) => { //stored proc parameterised
  const {id} = req.params;
  try {
    const result = await dbInstance.query('SELECT getStudentInfo($1);',[id]);
    res.json({data:result.rows});
    console.log("ana fl backend gowa");
    console.log(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});*/

/////////////////////////
admin_router.get('/api/admin/student/info/:id', async (req, res) => { //parameterised stored proc
  const { id } = req.params;
  try {
    const result = await dbInstance.query('SELECT getStudentInfo($1);', [id]);
    
    // Parse the string representation into an object
    const studentInfo = parseStudentInfo(result.rows[0].getstudentinfo);

    res.json({ data: studentInfo });
    console.log("ana fl backend gowa");
    console.log(studentInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to parse the string representation into an object
function parseStudentInfo(str) {
  const [std_id, fname, lname, email, major, passw, class_, rep_flag] = str.slice(1, -1).split(',');

  return {
    std_id: parseInt(std_id),
    fname,
    lname,
    email,
    major,
    passw,
    class: parseInt(class_),
    rep_flag: parseInt(rep_flag),
  };
}
////////////////////////
 
//ban/unban rep
admin_router.put('/api/admin/banRep/:stdId/:decision', async (req, res) => {
  const {decision, stdId} = req.params;
  let decision2;
  if (decision==2)
  {
    decision2=0;
  }
  else
  {
    decision2=1;
  }
  // stat: 0-> student , 1-> rep, 2-> banned rep
  // decision: 2-> ban, 1-> unban
  try {
    //exclude students , only banned and unbanned reps 
    const result1 = await dbInstance.query('UPDATE student SET rep_flag = $1 WHERE std_id=$2;', [decision2, stdId]);
    if (decision2 ==0) {
      const result2 = await dbInstance.query('delete from request_rep where std_id = $1;', [stdId]);
      console.log(result2.rows[0]);
     }
    console.log(result1.rows[0]);
    //console.log(result2.rows[0]);
    //, user2:result2.rows[0]
    res.json({ success: true,user1: result1.rows[0],message: 'status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//accept/reject rep
/*admin_router.put('/api/admin/respondRep/:id/:decision', async (req, res) => {
  const {decision,id} = req.params;
  // stat: 0-> student , 1-> rep, 2-> banned rep
  // decision: 2-> ban, 1-> unban
  try {
    //accepted clubs only
    const result = await dbInstance.query('UPDATE request_rep SET stat = $1 WHERE std_id=$2;', [decision, id]);
    res.json({ success: true,user: result.rows[0], message: 'req request status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});*/

//////////////////////////////////////////          CLUBS            ////////////////////////////////////////////
// Clubs
// get all approved clubs
admin_router.get('/api/admin/getAllClubs', async (req,res) => {
  try {
    //exclude pending clubs
    const result = await dbInstance.query('SELECT Distinct * FROM (student_club NATURAL JOIN request_std_club) WHERE stat in (1,2);'); 
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//ban/unban club
admin_router.put('/api/admin/banClub/:clubid/:decision/:adminid', async (req, res) => {
  const {decision,clubid,adminid} = req.params;
  // stat: 0-> pending , 1-> approved club, 2-> banned/rejected club
  // decision: 2-> ban, 1-> unban
  try {
    //accepted clubs only
    const result = await dbInstance.query('UPDATE request_std_club SET stat = $1, admin_id=$2 WHERE std_club_id=$3;', [decision, adminid, clubid]);
    res.json({ success: true,user: result.rows[0], message: 'status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get 1 club info
/*admin_router.get('/api/admin/club/info/:id', async (req,res) => { //stored proc parameterised
  const {id} = req.params;
  try {
    const result = await dbInstance.query('SELECT getClubInfo($1);',[id]);
    res.json({data:result.rows});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});*/

admin_router.get('/api/admin/club/info/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await dbInstance.query('SELECT getClubInfo($1);', [id]);

    // Parse the string representation into an object
    const clubInfo = parseClubInfo(result.rows[0].getclubinfo);

    res.json({ data: clubInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Function to parse the string representation into an object for club information
function parseClubInfo(str) {
  const [std_club_id, std_club_name, email, passw, about, logo] = str.slice(1, -1).split(',');

  return {
    std_club_id: parseInt(std_club_id),
    std_club_name,
    email,
    passw,
    about, 
    logo
  };
}

//accept/reject club
/*admin_router.put('/api/admin/respondClub/:id/:decision', async (req, res) => {
  const {decision,id} = req.params;
  // stat: 0-> student , 1-> rep, 2-> banned rep
  // decision: 2-> ban, 1-> unban
  try {
    //accepted clubs only
    const result = await dbInstance.query('UPDATE request_std_club SET stat = $1 WHERE std_club_id=$2;', [decision, id]);
    res.json({ success: true,user: result.rows[0], message: 'club request status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});*/
export { admin_router };

