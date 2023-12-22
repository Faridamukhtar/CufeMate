import React, { useState, useEffect } from 'react';
import ReqWriteTextPost from './ReqWriteTextPost.js';

const DropdownMenu = () =>
 {
  const [CoursesDropDown, setCoursesDropDown] = useState([]);
   // State to manage the selected value
  const [selectedValue, setSelectedValue] = useState('');

    useEffect(() =>
     {
      const fetchCourses = async () =>
       {
        try
         {
          const response = await fetch('http://localhost:8080/api/choosecourse/:major_id'); 
          const coursesData = await response.json();
          console.log(coursesData);
          const options = coursesData.map((course) => (<option value={course.course_id}>{course.course_name}</option>));
          setCoursesDropDown(options);
         } 
        catch (error)
         {
          console.error('Error fetching courses:', error);
         }
      };
      fetchCourses();
  
    }, []);

    

 

  // Event handler for dropdown change
  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  <select
    value={selectedValue}
    onChange={(e) => setSelectedValue(e.target.value)}
   ></select>
  return (
    <div>
      <label htmlFor="dropdown">Select Course:</label>
      <select id="dropdown" value={selectedValue} onChange={handleDropdownChange}>
        <option value="">-- Select --</option>
        {CoursesDropDown}
      </select>
      <ReqWriteTextPost selectedCourse={selectedValue} />
    </div>
  );
};

export default DropdownMenu;

////////////////////////////////////////////////////////////////////
