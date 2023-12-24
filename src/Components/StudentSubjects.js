import React, { useState,useEffect } from 'react';
import Table from "./Table.js"
import './StudentSubject.css';

const CourseTable = ({ data }) => (
  <table className="course-table">
    <thead>
      <tr>
        <th>Course ID</th>
        <th>Course Name</th>
      </tr>
    </thead>
    <tbody>
      {data.map(({ course_id, course_name }, index) => (
        <tr key={index}>
          <td>{course_id}</td>
          <td>{course_name}</td>
        </tr>
      ))}
    </tbody>
  </table>
);


  const SubjectsTable = ({Std_ID}) => {
    const [getAllSub, setGetAllSub] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [tableData, setTableData] = useState(null);
    const fetchDataForTable = async () => {
        try {
            let url= `http://localhost:8080/api/student/courses/${encodeURIComponent(Std_ID)}`
            const response = await fetch(url);
            console.log(url)
            const result = await response.json();
            setTableData(result.data);
        } catch (error) {
            console.error('Error fetching data for table:', error);
        }
    };
    
      const fetchSubjects = async () => {
        try {
          let url = `http://localhost:8080/api/GetAllSub/?id=${Std_ID}`;
          const response = await fetch(url);
          const data = await response.json();
          setGetAllSub(data);
          console.log(data);
          const outputArray = data.map((item) => ({
            id: item.course_id,
            course_name: item.course_name,
          }));
          setSubjects(outputArray);
        } catch (error) {
          console.error('Error fetching Members:', error);
        }
      };
      useEffect(() => {
        fetchDataForTable();
        fetchSubjects();

    }, []);
  
    const handleenrollement = async (course_id) =>
    {
       try {
         // Construct the URL with actual values for email and password
            let url = `http://localhost:8080/api/EnrollSubject/?std_id=${Std_ID}&course_id=${course_id}`;
             const response = await fetch(url); 
             const result = await response.json();   
             console.log('enrolled succesfully') 
             fetchDataForTable(0);

           } 
           catch (error) {
             console.error('Error enrolling :', error);
           }
     };


     const handleUnenroll = async (course_id) => {
        try {
            let url=`http://localhost:8080/api/unenroll/${encodeURIComponent(Std_ID)}/${encodeURIComponent(course_id)}`
            const response = await fetch(url);
            const result = await response.json();
            console.log('unenrolled succesfully') 
            fetchDataForTable(0);

        } catch (error) {
            console.error('Error unenrolling:', error);
        }
    };

    const handleunenrollclick = (course_id) => {
      handleUnenroll(course_id)
    };

    const handleenrollclick = (course_id) => {
      handleenrollement(course_id)
    };
  
    const tableTitles = ['course_name'];
  
    return (
      <div>
        <div className="Titles">Courses Taken</div> 
         {tableData && <CourseTable data={tableData} />}
        <Table titles={tableTitles} members={subjects} enroll={handleenrollclick} unenroll={handleunenrollclick}/>
      </div>
    );
  };
  



export default SubjectsTable;