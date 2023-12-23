import {dbInstance} from "./connection.js";

export const getPosts = async (req, res) => { 

    const FilterPosts = (author, major, course, std_id) =>
    {
      let CurrentQuery="";

      if (course!=='')
      {
        CurrentQuery+=`c.course_name = '${course}' ` 
      }
      else
      {
        if (major!=='')
        {
          CurrentQuery+='('
        }
        
        CurrentQuery+=
        ` 
        c.course_name in (
          SELECT course_name FROM student, course, takes WHERE course.course_id=takes.course_id
          AND takes.std_id=student.std_id AND Student.std_id = ${std_id} 
        )`;

        if (major!=='')
        {
          CurrentQuery+=`OR rtm.major_id = '${major}' ) ` 
        }
      }

      if (author!=='')
      {
        CurrentQuery+=`AND ((strpos(Fname,'${author}')>0) OR (strpos(Lname,'${author}')>0)) `
      }

      return (CurrentQuery);
    
    }

    const QueryGetPosts=(author, major, course)=>
    {
      return (`
      SELECT DISTINCT s.Fname, s.Lname, p.post_date, p.content, p.post_id, c.course_name, rtm.major_id
      FROM post p
      LEFT OUTER JOIN requests_to_write rtw 
          ON p.post_id = rtw.post_id AND rtw.flagstatus=1
      LEFT OUTER JOIN writes w 
          ON p.post_id = w.post_id
      LEFT OUTER JOIN student s 
          ON w.std_id = s.std_id OR rtw.std_id = s.std_id
      LEFT OUTER JOIN related_to_course rtc
          ON p.post_id = rtc.post_id
      LEFT OUTER JOIN course c 
          ON rtc.course_id = c.course_id
      LEFT OUTER JOIN related_to_major rtm 
          ON p.post_id = rtm.post_id
      WHERE
      ${FilterPosts(author, major, course, std_id)}`);
    }

    console.log('req body', req.body);
    const {author, major, course, std_id} = req.body;

    let Query = `${QueryGetPosts(author, major, course, std_id)}`;

    console.log(Query);
    try {
      const result = await dbInstance.query(Query);
      res.status(200).json({ success: true, message: 'Getting Posts', result: result.rows});
    } 
    
    catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// Get courses from the database
export const getCourses = async (req, res) => 
{
  try {
    const result = await dbInstance.query('SELECT * FROM course');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get courses from the database
export const getStudentCourses = async (req, res) => {
   
  const studentID = req.params.student;
  let query = 'SELECT course.course_id, course.course_name FROM Student, course, takes WHERE course.course_id=takes.course_id';
  query+= ' AND takes.std_id=student.std_id AND Student.std_id = $1 ';

    try {

      const result = await dbInstance.query(query, [studentID]);
      res.status(200).json({ success: true, message: 'Getting Student Courses', result: result.rows});

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

// Get courses from the database
export const getMajorAuthors = async (req, res) => {
   
  const majorID = req.params.major;

  let query = `
  SELECT DISTINCT student.std_id, student.fname, student.lname 
  FROM Student  
  INNER JOIN major 
    on major.major_id=student.major_id 
  LEFT OUTER JOIN writes 
    ON student.std_id = writes.std_id AND writes.post_id is NOT NULL
  LEFT OUTER JOIN Requests_to_write rtw ON 
    student.std_id = rtw.std_id AND rtw.post_id is NOT NULL AND rtw.flagstatus = 1
  WHERE major.major_id = '${majorID}'
  `
    try {

      const result = await dbInstance.query(query);
      res.status(200).json({ success: true, message: 'Getting Major Authors', result: result.rows});

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export const getLikesNo = async(req, res)=>
{
   
  const { post_id } = req.params;

  let query = `
  SELECT COUNT(*) AS "count"
  FROM likes
  WHERE post_id = ${post_id}
  `
    try {

      const result = await dbInstance.query(query);
      res.status(200).json({ success: true, message: 'Getting No. of likes', result: result.rows});

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export const getDidLike = async(req, res)=>
{
   
  const {post_id, std_id} = req.params;

  let query = `
  SELECT *
  FROM likes
  WHERE post_id = ${post_id} AND std_id = ${std_id}
  `
    try {

      const result = await dbInstance.query(query);
      res.status(200).json({ success: true, message: 'Getting Did Like', result: result.rows});

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export const like = async(req, res)=>
{
   
  const {post_id, std_id} = req.params;

  let query = `
  INSERT INTO likes (post_id, std_id)
  VALUES (${post_id}, ${std_id})
  `
    try {

      const result = await dbInstance.query(query);
      res.status(200).json({ success: true, message: 'Liked', result: result.rows});

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export const unlike = async(req, res)=>
{
   
  const {post_id, std_id} = req.params;

  let query = `
  DELETE FROM likes
  WHERE post_id=${post_id} AND std_id= ${std_id}
  `
    try {

      const result = await dbInstance.query(query);
      res.status(200).json({ success: true, message: 'Unliked', result: result.rows});

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}
