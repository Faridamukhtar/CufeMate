import React from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './StudentDashboard.css'

const StudentDashboard =()=>
{
    return (
        <div className="StudentPage">
            <div className="sidebar">
                <Sidebar SidebarType='student' />
            </div>
            <div className="Dashboard">
                <Dashboard DashboardType='student' studentType='student'/>
            </div>
        </div>
    );
}

export default StudentDashboard;