import React, { useState,useEffect } from 'react';
import Table from "./Table.js"


const CourseTable= ({ data }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.course_id}</td>
               <td>{row.course_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };


  const SubjectsTable = () => {
    const [getAllSub, setGetAllSub] = useState([]);
    const [subjects, setSubjects] = useState([]);
  
    useEffect(() => {
      const fetchSubjects = async (std_id) => {
        try {
          let url = `http://localhost:8080/api/GetAllSub/?id=${std_id}`;
          const response = await fetch(url);
          console.log(url);
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
  
      fetchSubjects(0);
    }, []);
  
    const handleenrollement = async (std_id,club_id) =>
    {
       try {
         // Construct the URL with actual values for email and password
         let url = `http://localhost:8080/api/GetAllSub/?std_id=${std_id}&course_id=${club_id}`;
     
         // Make a GET request to the constructed URL
             const response = await fetch(url); 
             const result = await response.json();
             // Handle the login result as needed
             console.log(result);
           } 
           catch (error) {
             console.error('Error during login:', error);
           }
           console.log("submit clicked");
     };


     const handleUnenroll = async (std_id, course_id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/unenroll/${encodeURIComponent(std_id)}/${encodeURIComponent(course_id)}`);
            const result = await response.json();
            console.log(result.data);
        } catch (error) {
            console.error('Error unenrolling:', error);
        }
    };

    ///el course id yba byt5ad hasab el zror 
    //check el fetching w el back bta3 both

  
    const tableTitles = ['course_name'];
  
    return (
      <div>
        <Table titles={tableTitles} members={subjects} enroll={handleenrollement} unenroll={()=> handleUnenroll(123, 'CMPS202')}/>
      </div>
    );
  };
  
const TablesSubjectsTaken = () => {
    const [tableData, setTableData] = useState(null);
    const fetchDataForTable = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/student/courses/${encodeURIComponent(id)}`);
            const result = await response.json();
            console.log(result.data);
            setTableData(result.data);
        } catch (error) {
            console.error('Error fetching data for table:', error);
        }
    };
    useEffect(() => {
        fetchDataForTable(123);
    }, []);

  return (
    <div>
        <div className="Titles">Courses Taken</div> 
         {tableData && <CourseTable data={tableData} />}
         <div> 
        <SubjectsTable/>
         </div>
    </div>
  );
};

export default TablesSubjectsTaken;