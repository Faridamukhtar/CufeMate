import { db } from "./connection";

const getPostMajor=(major)=>
{
    CurrentQuery="SELECT major_id FROM post, related_to_major, major WHERE related_to_major.major_id=major.major_id ";
    CurrentQuery+="AND post.post_id=related_to_major.post_id";
    if (major!=="")
    {
        CurrentQuery+=" AND major.major_name = " +  major;
    }
    return (CurrentQuery);
}

const getPostCourse = (course)=>
{
    CurrentQuery="SELECT course_id FROM post, related_to_course, course WHERE related_to_course.post_id = post.post_id AND";
    CurrentQuery+="related_to_course.course_id= course.course_id";
    if (course!=="")
    {
        CurrentQuery+=" AND course.course_name = " +  course;
    }
    return (CurrentQuery);
}

const getPostAuthor = (author) =>
{
    CurrentQuery="SELECT std_id FROM student, writes, requests_to_write WHERE (writes.std_id = student.std_id AND writes.post_id = post.post_id)";
    CurrentQuery+="OR (requests_to_write.std_id = student.std_id AND requests_to_write.post_id = post.post_id AND requests_to_write.FlagStatus = 1) ";
    if (author!=="")
    {
        CurrentQuery+="AND ((strpos(Fname," + author + ")>0) OR (strpos(Lname," + author + ")>0))";
    }
    return (CurrentQuery);
}

export const getPosts=(author="", major="", course="")=>
{
    CurrentQuery = "SELECT DISTINCT Fname, Lname, post_date, content, major_name, course_name ";
    CurrentQuery += "FROM student, course, major, post";
    CurrentQuery += "WHERE (student.std_id in (" + getPostAuthor(author) + ")) AND ";
    CurrentQuery += "((course.course_id in (" + getPostCourse(course) +")) OR (major.major_id in (" + getPostMajor(major) + ")))";

    db.query(CurrentQuery, (err,res)=>
    {
        err ? console.log(err.stack): ()=>
        {
            return (res);
        }
    });
}

