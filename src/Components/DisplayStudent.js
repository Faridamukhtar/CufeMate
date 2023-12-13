import React, { useState } from 'react';

const DisplayStudent = ({ student }) => {
  const [infoMessage, setInfoMessage] = useState('');

  const handleInfoClick = async (studentId) => {
    try {
      const url = `http://localhost:8080/api/admin/student/info/${studentId}`;
      const response = await fetch(url);
      const data = await response.json();
      setInfoMessage(JSON.stringify(data)); // Assuming your response is JSON data
    } catch (error) {
      console.error('Error fetching additional info:', error);
      setInfoMessage('Error fetching additional info');
    }
  };

  const handleBanClick = async (studentId,decision) => {
    try {
      const url = `http://localhost:8080/api/admin/banRep/${studentId}/${decision}`; // Assuming 2 is the decision for banning
      const response = await fetch(url, { method: 'PUT' });
      const data = await response.json();
      // Handle the ban response as needed
      console.log(data);
    } catch (error) {
      console.error('Error banning student:', error);
    }
  };

  const handleUnbanClick = async (studentId,decision) => {
    try {
      const url = `http://localhost:8080/api/admin/banRep/${studentId}/${decision}`; // Assuming 1 is the decision for unbanning
      const response = await fetch(url, { method: 'PUT' });
      const data = await response.json();
      // Handle the unban response as needed
      console.log(data);
    } catch (error) {
      console.error('Error unbanning student:', error);
    }
  };

  return (
    <div>
      <h2>{`Student Name: ${student.fname} ${student.lname}`}</h2>
      <h2>{`Student ID: ${student.std_id}`}</h2>
      
      {student.rep_flag === 0 && <h2>Student</h2>}
      {student.rep_flag === 1 && (
        <div>
          <h2>Rep</h2>
          <button onClick={() => handleBanClick(student.std_id,2)}>Ban</button>
        </div>
      )}
      {student.rep_flag === 2 && (
        <div>
          <h2>Rep</h2>
          <button onClick={() => handleUnbanClick(student.std_id,1)}>Unban</button>
        </div>
      )}

      <button onClick={() => handleInfoClick(student.std_id)}>Info</button>
      {infoMessage && <p>{infoMessage}</p>}
    </div>
  );
};

export default DisplayStudent;
