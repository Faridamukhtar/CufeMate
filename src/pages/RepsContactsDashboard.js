import React from "react";
import Sidebar from "../Components/Sidebar.js";
import Dashboard from "../Components/Dashboard.js";
import './RepsContactsDashboard.css'

const RepsContactsDashboard =()=>
{
    return (
        <div className="RepsContactsPage">
            <div className="sidebar">
                <Sidebar SidebarType='student'/>
            </div>
            <div className="Dashboard">
                <Dashboard DashboardType='reps_contacts'/>
            </div>
        </div>
    );
}

export default RepsContactsDashboard;
