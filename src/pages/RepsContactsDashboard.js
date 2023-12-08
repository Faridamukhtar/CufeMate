import React from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
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
