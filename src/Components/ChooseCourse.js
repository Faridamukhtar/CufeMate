import React, { useState, useEffect } from 'react';
import WriteTextPostMajor from './WriteTextPostMajor.js';
import WriteTextPostCourse from './WriteTextPostCourse.js';

const DropdownMenu = (props) =>
 {
  const [CoursesDropDown, setCoursesDropDown] = useState([]);
   // State to manage the selected value
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedOption, setSelectedOption]= useState('');
  const major_id=props.studentData.major_id;
    useEffect(() =>
     {
      const fetchCourses = async (major_id) =>
       {
        try
         {
          const response = await fetch(`http://localhost:8080/api/choosecourse/${encodeURIComponent(major_id)}`); 
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
      fetchCourses(major_id);
  
    }, []);

    

 

  // Event handler for dropdown change
  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
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
      <br/>
      <label htmlFor="optionDropdown">Select Option:</label>
      <select id="optionDropdown" value={selectedOption} onChange={handleOptionChange}>
        <option value="">-- Select --</option>
        <option value="PerMajor">Announcement per Major</option>
        <option value="PerCourse">Announcement per Course</option>

      </select>
      {selectedOption === 'PerMajor' && <WriteTextPostMajor studentData={props.studentData} />}
      {selectedOption === 'PerCourse' && <WriteTextPostCourse studentData={props.studentData} selectedCourse={selectedValue} />}

    </div>
  );
};

export default DropdownMenu;

////////////////////////////////////////////////////////////////////
