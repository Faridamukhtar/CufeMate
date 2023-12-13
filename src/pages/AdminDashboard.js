import React, { useState, useEffect } from "react";
import AdminBar from '../Components/adminBar.js'
import DisplayClub from "../Components/DisplayClub.js";
import DisplayStudent from "../Components/DisplayStudent.js";

const AdminDashboard = () => {
    const [clubs, setClubs] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch clubs
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
        <div className="layout">
            <AdminBar />
            <div className="Dashboard">
                <div className="students">
                    <h2>Students</h2>
                    {students.map(student => (
                        <DisplayStudent key={student.std_id} student={student} />
                    ))}
                </div>
                <div className="clubs">
                    <h2>Clubs</h2>
                    {clubs.map(club => (
                        <DisplayClub key={club.std_club_id} club={club} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
