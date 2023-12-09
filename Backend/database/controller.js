import { db } from "./connection.js";

const dbInstance = await db();

const getPostAuthor = (author) =>
{
  if (author!=='')
  {
    let CurrentQuery=`AND ((strpos(Fname,'${author}')>0) OR (strpos(Lname,'${author}')>0)) `
    return (CurrentQuery); 
  }
  else{
    return ("");
  }
}

const getPostMajor = (major)=>
{
  if (major!=='')
  {
    let CurrentQuery=`AND m.major_id = '${major}' ` 
    return (CurrentQuery);
  }
  else
  {
    return ("");
  }

}

const getPostCourse = (course)=>
{
  if (course!=='')
  {
    let CurrentQuery=`AND c.course_name = '${course}' ` 
    return (CurrentQuery);
  }
  else
  {
    return ("");
  }
}

const QueryWrites=(author, major, course)=>
{
  return(`SELECT DISTINCT s.Fname, s.Lname, p.post_date, p.content, p.post_id, c.course_name, m.major_id
  FROM post p
  INNER JOIN writes w ON p.post_id = w.post_id
  INNER JOIN student s ON w.std_id = s.std_id
  LEFT OUTER JOIN related_to_course rtc ON p.post_id = rtc.post_id
  LEFT OUTER JOIN course c ON rtc.course_id = c.course_id
  LEFT OUTER JOIN related_to_major rtm ON p.post_id = rtm.post_id
  LEFT OUTER JOIN major m ON rtm.major_id = m.major_id
  WHERE (p.post_id <> 0) ${getPostAuthor(author)} ${getPostMajor(major)} ${getPostCourse(course)}`);
}

const QueryRequestsToWrite=(author, major, course)=>
{
  return (`
  SELECT DISTINCT s.Fname, s.Lname, p.post_date, p.content, p.post_id, c.course_name, m.major_id
  FROM post p
  INNER JOIN requests_to_write rtw ON p.post_id = rtw.post_id
  INNER JOIN student s ON rtw.std_id = s.std_id
  LEFT OUTER JOIN related_to_course rtc ON p.post_id = rtc.post_id
  LEFT OUTER JOIN course c ON rtc.course_id = c.course_id
  LEFT OUTER JOIN related_to_major rtm ON p.post_id = rtm.post_id
  LEFT OUTER JOIN major m ON rtm.major_id = m.major_id
  WHERE (rtw.flagstatus=1) ${getPostAuthor(author)} ${getPostMajor(major)} ${getPostCourse(course)}`);
}

export const getPosts = async (req, res) => { 
  //req.body = {author:"", major:"CCE", course:""};
  console.log('req body', req.body);
  const author = req.body.author;
  const major = req.body.major;
  const course = req.body.course;
  let Query = `${QueryRequestsToWrite(author, major, course)}`;

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