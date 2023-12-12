import React, {useState} from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './StudentDashboard.css'

const StudentDashboard =()=>
{
    const [DashboardType, setDashboardType]=useState('student');

    return (
        <div className="StudentPage">
            <div className="sidebar">
                <Sidebar SidebarType='student' setOnClickNav={setDashboardType}/>
            </div>
            <div className="Dashboard">
                <Dashboard DashboardType={DashboardType} studentType='student'/>
            </div>
        </div>
    );
}

export default StudentDashboard;