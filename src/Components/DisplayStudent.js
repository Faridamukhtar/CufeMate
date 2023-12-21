import React, { useState } from 'react';
import'./DisplayStudent.css';

const DisplayStudent = ({ student,adminID }) => {
  const [infoMessage, setInfoMessage] = useState('');
  const [infoVisible, setInfoVisible] = useState(true);

  const handleHideInfoClick = () => {
    setInfoVisible(false);
  };

  const handleInfoClick = async (studentId) => {
    try {
      const url = `http://localhost:8080/api/admin/student/info/${studentId}`;
      const response = await fetch(url);
      const data = await response.json();
      setInfoVisible(true);
      setInfoMessage(JSON.stringify(data)); // Assuming your response is JSON data
    } catch (error) {
      console.error('Error fetching additional info:', error);
      setInfoMessage('Error fetching additional info');
    }
  };

  const handleBanClick = async (studentId,decision,adminID) => {
    try {
      const url = `http://localhost:8080/api/admin/banRep/${studentId}/${decision}/${adminID}`; // Assuming 2 is the decision for banning
      const response = await fetch(url, { method: 'PUT' });
      const data = await response.json();
      // Handle the ban response as needed
      console.log(data);
      alert("please refresh after banning/unbanning to get updated feed");
    } catch (error) {
      console.error('Error banning student:', error);
    }
  };

  const handleUnbanClick = async (studentId,decision,adminID) => {
    console.log(studentId);
    try {
      const url = `http://localhost:8080/api/admin/banRep/${studentId}/${decision}/${adminID}`; // Assuming 1 is the decision for unbanning
      const response = await fetch(url, { method: 'PUT' });
      const data = await response.json();
      // Handle the unban response as needed
      console.log(data);
      alert("please refresh after banning/unbanning to get updated feed");
    } catch (error) {
      console.error('Error unbanning student:', error);
    }
  };

  return (
    <div>
      <div className='main'>
      <div className='font'>{`Student Name: ${student.fname} ${student.lname}`}</div>
      <div className='font'>{`Student ID: ${student.std_id}`}</div>
      
      {student.rep_flag === 0 && (
      <div>
      <div className='font2'>Student</div>
      <div className='buttons'>
      <button onClick={() => handleInfoClick(student.std_id)}>Show Info</button>
      <button onClick={handleHideInfoClick}>Hide Info</button>
      </div>
      </div>  
      )}
      {student.rep_flag === 1 && (
        <div>
          <div className='font2'>Rep</div>
          <div className='buttons'>
          <button onClick={() => handleBanClick(student.std_id,2,adminID)}>Ban</button>
          <button onClick={() => handleInfoClick(student.std_id)}>Show Info</button>
          <button onClick={handleHideInfoClick}>Hide Info</button>
          </div>
        </div>
      )}
      {student.rep_flag === 2 && (
        <div>
          <div className='font2'>Rep</div>
          <div className='buttons'>
          <button onClick={() => handleUnbanClick(student.std_id,1,adminID)}>Unban</button>
          <button onClick={() => handleInfoClick(student.std_id)}>Show Info</button>
          <button onClick={handleHideInfoClick}>Hide Info</button>
          </div>
        </div>
      )}
      {infoVisible && infoMessage && <p>{infoMessage}</p>}
      
      </div>
    </div>
  );
};

export default DisplayStudent;
