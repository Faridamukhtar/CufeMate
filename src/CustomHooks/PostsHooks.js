import React from "react";

export async function getposts(author = "", major = "", course = "")
{
  try 
  {
    const response = await fetch("http://localhost:8080/api/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: author || "",
        major: major || "",
        course: course || "",
      }),
    });

    const data = await response.json();
    console.log("ay 7aga");
    console.log(data.result);
    return data.result;
  } 
  catch (error) 
  {
    console.log(error);
  }
}

export async function fetchCourses()
{
    try {
      const response = await fetch('http://localhost:8080/api/courses'); 
      const CoursesData = await response.json();
      console.log(CoursesData);
      return CoursesData.rows;
    } 
    
    catch (error) 
    {
      console.error('Error fetching courses:', error);
    }
};

export async function fetchStudentCourses(student_id)
{
    try {
      const response = await fetch(`http://localhost:8080/api/courses/${encodeURIComponent(student_id)}`); 
      const CoursesData = await response.json();
      console.log(CoursesData);
      return CoursesData.result;
    } 
    
    catch (error) 
    {
      console.error('Error fetching courses:', error);
    }
};

export async function fetchMajorAuthors(major_id)
{
  try {
    const response = await fetch(`http://localhost:8080/api/major/${encodeURIComponent(major_id)}`); 
    const MajorData = await response.json();
    console.log(MajorData);
    return MajorData.result;
  } 
  
  catch (error) 
  {
    console.error('Error fetching courses:', error);
  }
}