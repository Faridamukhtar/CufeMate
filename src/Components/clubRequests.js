import React, { useState } from 'react';

const ClubRequests = ({ Club }) => {

    const [infoMessage, setInfoMessage] = useState('');

    const handleInfoClick = async (ClubId) => {
      try {
        const url = `http://localhost:8080/api/admin/club/info/${ClubId}`;
        const response = await fetch(url);
        const data = await response.json();
        setInfoMessage(JSON.stringify(data)); // Assuming your response is JSON data
      } catch (error) {
        console.error('Error fetching additional info:', error);
        setInfoMessage('Error fetching additional info');
      }
    };

  const handleRejectClick = async (ClubId,decision) => {
    try {
      const url = `http://localhost:8080/api/requests/club/approve_decline/${decision}/${ClubId}`; // Assuming 2 is the decision for banning
      const response = await fetch(url, { method: 'PUT' });
      const data = await response.json();
      // Handle the ban response as needed
      console.log(data);
    } catch (error) {
      console.error('Error Rejecting Club:', error);
    }
  };

  const handleApproveClick = async (ClubId,decision) => {
    try {
      const url = `http://localhost:8080/api/requests/club/approve_decline/${decision}/${ClubId}`; // Assuming 1 is the decision for unbanning
      const response = await fetch(url, { method: 'PUT' });
      const data = await response.json();
      // Handle the unban response as needed
      console.log(data);
    } catch (error) {
      console.error('Error Approving Club:', error);
    }
  };

  return (
    <div>
      <h2>{`Club Name: ${Club.name}`}</h2>
      <p>{`Club ID: ${Club.std_club_id}`}</p>
        <button onClick={() => handleRejectClick(Club.std_club_id,2)}>Reject</button>
        <button onClick={() => handleApproveClick(Club.std_club_id,1)}>Approve</button>
        <button onClick={() => handleInfoClick(Club.std_club_id)}>Info</button>
      {infoMessage && <p>{infoMessage}</p>}
    </div>
  );
};

export default ClubRequests;
// need to make components disappear