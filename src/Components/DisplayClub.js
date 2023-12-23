import React, { useState } from 'react';
import'./DisplayStudent.css';

const DisplayClub = ({ Club , adminID}) => {
  const [infoMessage, setInfoMessage] = useState('');
  const [infoVisible, setInfoVisible] = useState(true);

  const handleInfoClick = async (ClubId) => {
    try {
      const url = `http://localhost:8080/api/admin/club/info/${ClubId}`;
      const response = await fetch(url);
      const result = await response.json();
      setInfoMessage(result.data); // Assuming your response is JSON data
      setInfoVisible(true);
    } catch (error) {
      console.error('Error fetching additional info:', error);
      setInfoMessage('Error fetching additional info');
    }
  };

  const InfoTextBox = ({ message }) => {
    console.log("ana message",message);
    return (
      <div className="info-textbox">
        <p>Email: {message.email}</p>
        <p>Password: {message.passw}</p>
      </div>
    );
  };


  const handleHideInfoClick = () => {
    setInfoVisible(false);
  };
  const handleBanClick = async (ClubId,decision,adminID) => {
    try {
      const url = `http://localhost:8080/api/admin/banClub/${ClubId}/${decision}/${adminID}`; // Assuming 2 is the decision for banning
      const response = await fetch(url, { method: 'PUT' });
      const data = await response.json();
      // Handle the ban response as needed
      console.log(data);
    } catch (error) {
      console.error('Error banning student:', error);
    }
  };

  const handleUnbanClick = async (ClubId,decision,adminID) => {
    try {
      const url = `http://localhost:8080/api/admin/banClub/${ClubId}/${decision}/${adminID}`; // Assuming 1 is the decision for unbanning
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
      <div className='request'>
      <div className='name'>{`Club Name: ${Club.std_club_name}`}</div>
      <div className='details'>{`Club ID: ${Club.std_club_id}`}</div>
      <div className='details'>{`Club Status: ${Club.stat}`}</div>
      <div className='details'>1: unbanned 2:banned </div>
        <div>
          <button onClick={() => handleBanClick(Club.std_club_id,2,adminID)}>Ban</button>
          <button onClick={() => handleUnbanClick(Club.std_club_id,1,adminID)}>Unban</button>
        </div>
        <button onClick={() => handleInfoClick(Club.std_club_id)}>Show Info</button>
      <button onClick={handleHideInfoClick}>Hide Info</button>
      {infoVisible && infoMessage && (
          <InfoTextBox message={infoMessage} onClose={handleHideInfoClick} />
        )}
    </div>
    </div>
  );
};

export default DisplayClub;
