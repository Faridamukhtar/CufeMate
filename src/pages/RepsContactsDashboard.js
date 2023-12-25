import React from "react";
import Sidebar from "../Components/Sidebar.js";
import Dashboard from "../Components/Dashboard.js";
import './RepsContactsDashboard.css'
import { useParams } from "react-router-dom";

const RepsContactsDashboard =()=>
{
    let student={std_id:0, major_id:'', fname:'', lname:'', class:''}
    student = useParams();
    
    console.log(student.fname);

    return (
        <div className="RepsContactsPage">
            <div className="sidebar">
                <Sidebar SidebarType='student' studentData={student}/>
            </div>
            <div className="Dashboard">
                <Dashboard DashboardType='reps_contacts'studentData={student}/>
            </div>
        </div>
    );
}

export default RepsContactsDashboard;
