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


  const SubjectsTable = () => {
    const [getAllSub, setGetAllSub] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [tableData, setTableData] = useState(null);
    const fetchDataForTable = async (id) => {
        try {
            let url= `http://localhost:8080/api/student/courses/${encodeURIComponent(id)}`
            const response = await fetch(url);
            console.log(url)
            const result = await response.json();
            setTableData(result.data);
        } catch (error) {
            console.error('Error fetching data for table:', error);
        }
    };
    
      const fetchSubjects = async (std_id) => {
        try {
          let url = `http://localhost:8080/api/GetAllSub/?id=${std_id}`;
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
        fetchDataForTable(0);
        fetchSubjects(0);

    }, []);
  
    const handleenrollement = async (std_id,club_id) =>
    {
       try {
         // Construct the URL with actual values for email and password
            let url = `http://localhost:8080/api/EnrollSubject/?std_id=${std_id}&course_id=${club_id}`;
             const response = await fetch(url); 
             const result = await response.json();   
             console.log('enrolled succesfully') 
             fetchDataForTable(0);

           } 
           catch (error) {
             console.error('Error enrolling :', error);
           }
     };


     const handleUnenroll = async (std_id, course_id) => {
        try {
            let url=`http://localhost:8080/api/unenroll/${encodeURIComponent(std_id)}/${encodeURIComponent(course_id)}`
            const response = await fetch(url);
            const result = await response.json();
            console.log('unenrolled succesfully') 
            fetchDataForTable(0);

        } catch (error) {
            console.error('Error unenrolling:', error);
        }
    };

    const handleunenrollclick = (course_id,id) => {
      id=0;
      handleUnenroll(id,course_id)
    };

    const handleenrollclick = (course_id,id) => {
      id=0;
      handleenrollement(id,course_id)
    };

    ///el course id yba byt5ad hasab el zror 
    //check el fetching w el back bta3 both

  
    const tableTitles = ['course_name'];
  
    return (
      <div>
        <div className="Titles">Courses Taken</div> 
         {tableData && <CourseTable data={tableData} />}
        <Table titles={tableTitles} members={subjects} enroll={handleenrollclick} unenroll={handleunenrollclick}/>
      </div>
    );
  };
  

const TablesSubjectsTaken = () => {
   

  return (
    <div>        
        <SubjectsTable/>
    </div>
  );
};

export default TablesSubjectsTaken;