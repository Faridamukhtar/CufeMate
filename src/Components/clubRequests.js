import React, { useState } from 'react';
import './adminCompRequests.css'

const ClubRequests = ({ club,adminID }) => {
  console.log("ana fl club requests ", adminID)
    const [infoMessage, setInfoMessage] = useState('');
    const [infoVisible, setInfoVisible] = useState(true);

    const handleHideInfoClick = () => {
      setInfoVisible(false);
    };

    const handleInfoClick = async (ClubId) => {
      try {
        const url = `http://localhost:8080/api/admin/club/info/${ClubId}`;
        const response = await fetch(url);
        const result = await response.json();
        setInfoVisible(true);
        setInfoMessage(result.data); 
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

  const InfoTextBox = ({ message }) => {
    console.log(message);
    return (
      <div className="info-textbox">
        <p>Email: {message[0].email}</p>
        <p>Password: {message[0].passw}</p>
      </div>
    );
  };

  return (
    <div className='request'>
      <div className='name'> Club Name: {`${club.std_club_name}`}<br/> </div>
      <div className='details'> <br/> {`Club ID: ${club.std_club_id}`}</div>
      <div className='buttons'>
        <div className='decisionButtons'></div>
        <button onClick={() => handleRejectClick(club.std_club_id,2,adminID)}>Reject</button>
        <button onClick={() => handleApproveClick(club.std_club_id,1,adminID)}>Approve</button>
        </div>
        <div className='infoButtons'>
        <button onClick={() => handleInfoClick(club.std_club_id)}>Show Info</button>
        <button onClick={handleHideInfoClick}>Hide Info</button>
        {infoVisible && infoMessage && (
          <InfoTextBox message={infoMessage} onClose={handleHideInfoClick} />
        )}
      </div>
    </div>
  );
};

export default ClubRequests;
// need to make components disappear -> handled in main component