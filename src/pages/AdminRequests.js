import React, { useState, useEffect } from "react";
import ClubRequests from "../Components/clubRequests.js";
import RepRequests from "../Components/repRequests.js";
import AdminBar from "../Components/adminBar.js";
import { useParams } from 'react-router-dom';

const AdminRequests = () => { 
    const { admin_id } = useParams();//pass AdminID to the component
    console.log("ana fl requests ", admin_id)
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
            <AdminBar props={admin_id}/>
            <div className="Dashboard">
                <div className="reps">
                    <h2>Reps</h2>
                    {reps.map(rep => (
                        <RepRequests key={rep.std_id} rep={rep} adminID={admin_id}/>
                    ))}
                </div>
                <div className="clubs">
                    <h2>Clubs</h2>
                    {clubs.map(club => (
                        <ClubRequests key={club.std_club_id} club={club} adminID={admin_id} />
                    ))}
                </div>
            </div>
            </div>
    );
};

export default AdminRequests;
