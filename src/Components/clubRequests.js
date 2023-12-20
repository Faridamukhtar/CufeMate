import React, { useState } from 'react';

const ClubRequests = ({ club,adminID }) => {
  console.log("ana fl club requests ", adminID)
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

  const handleRejectClick = async (ClubId,decision,adminID) => {
    try {
      const url = `http://localhost:8080/api/requests/club/approve_decline/${decision}/${ClubId}/${adminID}`; // Assuming 2 is the decision for banning
      const response = await fetch(url, { method: 'PUT' });
      const data = await response.json();
      // Handle the ban response as needed
      console.log(data);
      alert("request rejected, refresh to see updated page");
    } catch (error) {
      console.error('Error Rejecting Club:', error);
    }
  };

  const handleApproveClick = async (ClubId,decision,adminID) => {
    try {
      const url = `http://localhost:8080/api/requests/club/approve_decline/${decision}/${ClubId}/${adminID}`; // Assuming 1 is the decision for unbanning
      const response = await fetch(url, { method: 'PUT' });
      const data = await response.json();
      // Handle the unban response as needed
      console.log(data);
      alert("request approved, refresh to see updated page");
    } catch (error) {
      console.error('Error Approving Club:', error);
    }
  };

  return (
    <div>
      <h2>{`Club Name: ${club.std_club_name}`}</h2>
      <p>{`Club ID: ${club.std_club_id}`}</p>
        <button onClick={() => handleRejectClick(club.std_club_id,2,adminID)}>Reject</button>
        <button onClick={() => handleApproveClick(club.std_club_id,1,adminID)}>Approve</button>
        <button onClick={() => handleInfoClick(club.std_club_id)}>Info</button>
      {infoMessage && <p>{infoMessage}</p>}
    </div>
  );
};

export default ClubRequests;
// need to make components disappear -> handled in main component