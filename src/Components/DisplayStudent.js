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
      const result = await response.json();
      setInfoMessage(result.data);
      setInfoVisible(true);
    } catch (error) {
      console.error('Error fetching additional info:', error);
      setInfoMessage('Error fetching additional info');
    }
  };

  const InfoTextBox = ({ message }) => {
    console.log(message);
    return (
      <div className="info-textbox">
        <p>Email: {message[0].email}</p>
        <p>Password: {message[0].passw}</p>
        <p>Major: {message[0].major_id}</p>
        <p>Class: {message[0].class} </p>
      </div>
    );
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
      <div className='request'>
      <div className='name'>{`Student Name: ${student.fname} ${student.lname}`}</div>
      <div className='details'>{`Student ID: ${student.std_id}`}</div>
      
      {student.rep_flag === 0 && (
      <div>
      <div className='details'>Student</div>
      <div className='infoButtons'>
      <button onClick={() => handleInfoClick(student.std_id)}>Show Info</button>
      <button onClick={handleHideInfoClick}>Hide Info</button>
      </div>
      </div>  
      )}
      {student.rep_flag === 1 && (
        <div>
          <div className='buttons'>
            <div className='decisionButtons'>
          <button onClick={() => handleBanClick(student.std_id,2,adminID)}>Ban</button>
          </div>
          <div className='infoButtons'>
          <button onClick={() => handleInfoClick(student.std_id)}>Show Info</button>
          <button onClick={handleHideInfoClick}>Hide Info</button>
          </div>
          </div>
        </div>
      )}
      {student.rep_flag === 2 && (
        <div>
          <div className='buttons'>
          <div className='decisionButtons'>
          <button onClick={() => handleUnbanClick(student.std_id,1,adminID)}>Unban</button>
          </div>
          <div className='infoButtons'>
          <button onClick={() => handleInfoClick(student.std_id)}>Show Info</button>
          <button onClick={handleHideInfoClick}>Hide Info</button>
          </div>
          </div>
        </div>
      )}
      {infoVisible && infoMessage && (
          <InfoTextBox message={infoMessage} onClose={handleHideInfoClick} />
        )}
      
      </div>
    </div>
  );
};

export default DisplayStudent;
