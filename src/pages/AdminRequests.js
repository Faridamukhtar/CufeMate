import React, { useState, useEffect } from "react";
import AdminBar from '../Components/adminBar.js'
import ClubRequests from "../Components/clubRequests.js";
import RepRequests from "../Components/repRequests.js";

const AdminRequests = (props) => { //pass AdminID to the component
    const [clubs, setClubs] = useState([]);
    const [reps, setReps] = useState([]);

    useEffect(() => {
        // Fetch clubs
        fetch(`http://localhost:8080/api/requests/club/${encodeURIComponent(props)}`)
            .then(response => response.json())
            .then(data => setClubs(data))
            .catch(error => console.error('Error fetching clubs:', error));

        // Fetch students
        fetch(`http://localhost:8080/api/requests/rep/${encodeURIComponent(props)}`)
            .then(response => response.json())
            .then(data => setReps(data))
            .catch(error => console.error('Error fetching reps:', error));
    }, []);

    return (
        <div className="layout">
            <AdminBar />
            <div className="Dashboard">
                <div className="reps">
                    <h2>Students</h2>
                    {reps.map(rep => (
                        <RepRequests key={rep.std_id} student={rep} />
                    ))}
                </div>
                <div className="clubs">
                    <h2>Clubs</h2>
                    {clubs.map(club => (
                        <ClubRequests key={club.std_club_id} club={club} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminRequests;
