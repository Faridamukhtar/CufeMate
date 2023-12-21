import React, { useState } from 'react';
import'./DisplayClub.css';

const DisplayClub = ({ Club , adminID}) => {
  const [infoMessage, setInfoMessage] = useState('');
  const [infoVisible, setInfoVisible] = useState(true);

  const handleInfoClick = async (ClubId) => {
    try {
      const url = `http://localhost:8080/api/admin/club/info/${ClubId}`;
      const response = await fetch(url);
      const data = await response.json();
      setInfoMessage(JSON.stringify(data)); // Assuming your response is JSON data
      setInfoVisible(true);
    } catch (error) {
      console.error('Error fetching additional info:', error);
      setInfoMessage('Error fetching additional info');
    }
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
      <h2>{`Club Name: ${Club.std_club_name}`}</h2>
      <p>{`Club ID: ${Club.std_club_id}`}</p>
      <h2>{`Club Status: ${Club.stat} 1: unbanned 2:banned`}</h2>
        <div>
          <button onClick={() => handleBanClick(Club.std_club_id,2,adminID)}>Ban</button>
          <button onClick={() => handleUnbanClick(Club.std_club_id,1,adminID)}>Unban</button>
        </div>
        <button onClick={() => handleInfoClick(Club.std_club_id)}>Show Info</button>
      <button onClick={handleHideInfoClick}>Hide Info</button>
      {infoVisible && infoMessage && <p>{infoMessage}</p>}
    </div>
  );
};

export default DisplayClub;
