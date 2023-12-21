import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './AdminDashboard.css';
import DisplayClub from "../Components/DisplayClub.js";
import DisplayStudent from "../Components/DisplayStudent.js";
import AdminBar from "../Components/adminBar.js";

const AdminDashboard = () => {
    const { admin_id } = useParams();
    console.log("ana da5alt el dashborad", admin_id);
    const [clubs, setClubs] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch accepted/banned clubs (exclude pending)
        fetch('http://localhost:8080/api/admin/getAllClubs')
            .then(response => response.json())
            .then(data => setClubs(data))
            .catch(error => console.error('Error fetching clubs:', error));

        // Fetch students
        fetch('http://localhost:8080/api/admin/getAllStudents')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error fetching students:', error));
    }, []);

    return (
        <div className="Layout">
            <div className="bar">
                <AdminBar props={admin_id}/>
            </div> 
        <div className="Dashboard">
        <div className="MainTitle2">All Users Window</div>
        <div className="Dashboard2">
            <div className="students">
                <div className="Titles2">Students</div>
                {students.map(student => (
                    <DisplayStudent key={student.std_id} student={student} adminID={admin_id} />
                ))}
            </div>
            <div className="clubs">
            <div className="Titles2">Clubs</div>
                {clubs.map(club => (
                    <DisplayClub key={club.std_club_id} Club={club} adminID={admin_id}/>
                ))}
            </div>
        </div>
        </div>
        </div>
    );
};

export default AdminDashboard;
