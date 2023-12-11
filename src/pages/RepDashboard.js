import React from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './StudentDashboard.css'

const RepDashboard =()=>
{
    return (
        <div className="StudentPage">
            <div className="sidebar">
                <Sidebar SidebarType='studentRep'/>
            </div>
            <div className="Dashboard">
                <Dashboard DashboardType='studentRep'/>
            </div>
        </div>
    );
}

export default RepDashboard;