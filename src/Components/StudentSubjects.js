import React, { useState,useEffect } from 'react';
import ClubMemberTable from "./ClubMemberTable.js"


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


/*const  SubjectsTable=()=>
{   
    
    const [Subjects, setSubject] = useState([]);

      /////////////////////////////////////TO BE REMOVED WHEN ACTUAL LINKING OCCUR//////////////////////
      let id = 0;

    useEffect(() => {
        const fetchMembers = async (id) => {
            try {
                let url = `http://localhost:8080/api/GetAllSub/?id=${id}`;
                const response = await fetch(url);
                console.log(url);
                const data = await response.json();
                setSubject(data);
                console.log(data);
                // Update outputArray after setting the state
                const outputArray = data.map((item) => ({
                    id: item.course_id ,
                    course_name: item.course_name,
            }));
            setMembers(outputArray);
            } catch (error) {
                 console.error('Error fetching Members:', error);
            }
         };

        fetchMembers(id);
    }, []);

    const [subjects, setSubjects] = useState([]);
    console.log('Output',subjects)

   // const handleRemoveMemberfromclub = async (id) => {
     //   const yr = new Date().getFullYear();
     //   const url = `http://localhost:8080/api/RemoveMember/?id=${id}&std_club_id=${std_clb_id}&year=${yr}`;
     //   console.log(url)
     //   const response = await fetch(url);
   // }

    
      const handleRemoveMember = (id) => {
        const updatedSubject = subjects.filter((member) => member.id !== id);
        setSubjects(updatedSubject);
        handleRemoveMemberfromclub(id,std_clb_id)
      };
    
      const tableTitles = ['course_name']; //Lazm yba nfs el maktob gamb el id fy el use state fo2
      

    return (
            <div>
                <ClubMemberTable titles={tableTitles} members={subjects} onRemoveMember={handleRemoveMember} />

            </div>
    );
}*/

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
    </div>
  );
};

export default TablesSubjectsTaken;