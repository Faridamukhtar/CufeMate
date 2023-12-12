
//STD ID AUTHOR
SELECT s.Fname, s.Lname, p.post_date, p.content, p.post_id, 
        c.course_name, m.major_id
FROM student, major, post, course
WHERE std_id in




