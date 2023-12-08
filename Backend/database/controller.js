import { db } from "./connection.js";

const dbInstance = await db();

const getPostAuthor = (author) =>
{
  let CurrentQuery=`SELECT DISTINCT post.post_id
  FROM post, student, requests_to_write
  WHERE (requests_to_write.std_id = student.std_id AND requests_to_write.post_id = post.post_id AND requests_to_write.flagstatus = 1 AND (strpos(Fname,'${author}')>0 OR strpos(Lname,'${author}')>0)) 
  UNION
  SELECT DISTINCT post.post_id
  FROM post, student, writes
  WHERE (writes.std_id = student.std_id AND writes.post_id = post.post_id AND (strpos(Fname,'${author}')>0 OR strpos(Lname,'${author}')>0))` 
  
  return (CurrentQuery);
}

const getPostMajor=(major)=>
{
  let CurrentQuery=`SELECT DISTINCT post.post_id
  FROM post, related_to_major, major
  WHERE related_to_major.post_id = post.post_id AND related_to_major.major_id= major.major_id 
  AND major.major_name = '${major}'` 
  
  return (CurrentQuery);

}

const getPostCourse = (course)=>
{
  let CurrentQuery=`SELECT DISTINCT post.post_id
  FROM post, related_to_course, course
  WHERE related_to_course.post_id = post.post_id AND related_to_course.course_id= course.course_id 
  AND course.course_name = '${course}'` 
  
  return (CurrentQuery);
}


export const getPosts = async (req, res) => {

  const { author, major, course } = req.body;

  let CurrentQuery= "SELECT DISTINCT post.post_id FROM post ";

  if (course!==undefined && course!=="")
  {
    CurrentQuery+= `INTERSECT ${getPostCourse(course)} `;
  }

  if (major!==undefined && major!=="")
  {
    CurrentQuery+= `INTERSECT ${getPostMajor(major)} `;
  }

  if (author!==undefined && author!=="")
  {
    CurrentQuery+= `INTERSECT ${getPostAuthor(author)} `;
  }

  let Query= `SELECT DISTINCT s.Fname, s.Lname, p.post_date, p.content, p.post_id, c.course_name
  FROM post p
  INNER JOIN writes w ON p.post_id = w.post_id
  INNER JOIN student s ON w.std_id = s.std_id
  LEFT OUTER JOIN related_to_course rtc ON p.post_id = rtc.post_id
  LEFT OUTER JOIN course c ON rtc.course_id = c.course_id
  LEFT OUTER JOIN related_to_major rtm ON p.post_id = rtm.post_id
  LEFT OUTER JOIN major m ON rtm.major_id = m.major_id
  WHERE p.post_id IN (${CurrentQuery})
  UNION
  SELECT DISTINCT s.Fname, s.Lname, p.post_date, p.content, p.post_id, c.course_name
  FROM post p
  INNER JOIN requests_to_write rtw ON p.post_id = rtw.post_id
  INNER JOIN student s ON rtw.std_id = s.std_id
  LEFT OUTER JOIN related_to_course rtc ON p.post_id = rtc.post_id
  LEFT OUTER JOIN course c ON rtc.course_id = c.course_id
  LEFT OUTER JOIN related_to_major rtm ON p.post_id = rtm.post_id
  LEFT OUTER JOIN major m ON rtm.major_id = m.major_id
  WHERE rtw.flagstatus = 1 AND p.post_id IN (${CurrentQuery});
  `;
  
  try {
    const result = await dbInstance.query(Query);
    res.status(200).json({ success: true, message: 'Getting Posts By Course', result: result.rows});
  } 
  
  catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}