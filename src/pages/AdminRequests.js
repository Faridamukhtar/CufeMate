import React, { useState, useEffect } from "react";
import ClubRequests from "../Components/clubRequests.js";
import RepRequests from "../Components/repRequests.js";
import AdminBar from "../Components/adminBar.js";
import { useParams } from 'react-router-dom';
import './AdminRequests.css'

const AdminRequests = () => { 
    const { admin_id } = useParams();//pass AdminID to the component
    const [clubs, setClubs] = useState([]);
    const [reps, setReps] = useState([]);

    useEffect(() => {
        // Fetch clubs' requests
        fetch(`http://localhost:8080/api/requests/club`)
            .then(response => response.json())
            .then(data => setClubs(data))
            .catch(error => console.error('Error fetching clubs:', error));

        // Fetch reps' requests
        fetch(`http://localhost:8080/api/requests/rep`)
            .then(response => response.json())
            .then(data => setReps(data))
            .catch(error => console.error('Error fetching reps:', error));
    }, []);

    return (
        <div className="Layout">
            <div className="bar">
                <AdminBar props={admin_id}/>
            </div> 
            <div className="Dashboard">
            <div className="MainTitle2">Requests Window</div> 
            <div className="requests">
                <div className="reps">
                    <div className="Titles2">Reps</div>
                    {reps.map(rep => (
                        <RepRequests key={rep.std_id} rep={rep} adminID={admin_id}/>
                    ))}
                </div>
                <div className="clubs">
                <div className="Titles2">Clubs</div>
                    {clubs.map(club => (
                        <ClubRequests key={club.std_club_id} club={club} adminID={admin_id} />
                    ))}
                </div>
            </div>
            </div>
            </div>
    );
};

export default AdminRequests;
