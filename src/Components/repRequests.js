import React, { useState } from 'react';

const RepRequests = ({ rep }) => {

    const [infoMessage, setInfoMessage] = useState('');

    const handleInfoClick = async (repId) => {
      try {
        const url = `http://localhost:8080/api/admin/student/info/${repId}`;
        const response = await fetch(url);
        const data = await response.json();
        setInfoMessage(JSON.stringify(data)); // Assuming your response is JSON data
      } catch (error) {
        console.error('Error fetching additional info:', error);
        setInfoMessage('Error fetching additional info');
      }
    };

  const handleRejectClick = async (repId,decision) => {
    try {
      const url = `http://localhost:8080/api/requests/student/approve_decline/${decision}/${repId}`; // Assuming 2 is the decision for banning
      const response = await fetch(url, { method: 'PUT' });
      const data = await response.json();
      // Handle the ban response as needed
      console.log(data);
    } catch (error) {
      console.error('Error Rejecting Rep:', error);
    }
  };

  const handleApproveClick = async (repId,decision) => {
    try {
      const url = `http://localhost:8080/api/requests/student/approve_decline/${decision}/${repId}`; // Assuming 1 is the decision for unbanning
      const response = await fetch(url, { method: 'PUT' });
      const data = await response.json();
      // Handle the unban response as needed
      console.log(data);
    } catch (error) {
      console.error('Error Approving Rep:', error);
    }
  };

  return (
    <div>
      <h2>{`Requesting Rep Name: ${rep.fname} ${rep.lname}`}</h2>
      <p>{`Requesting Rep ID: ${rep.std_id}`}</p>
        <button onClick={() => handleRejectClick(rep.std_id,2)}>Reject</button>
        <button onClick={() => handleApproveClick(rep.std_id,1)}>Approve</button>
        <button onClick={() => handleInfoClick(rep.std_id)}>Info</button>
      {infoMessage && <p>{infoMessage}</p>}
    </div>
  );
};

export default RepRequests;
// need to make components disappear