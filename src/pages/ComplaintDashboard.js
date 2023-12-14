import React from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './ComplaintDashboard.css'

const ComplaintDashboard =()=>
{
    return (
        <div className="ComplaintPage">
            <div className="sidebar">
                <Sidebar SidebarType='student'/>
            </div>
            <div className="Dashboard">
                <Dashboard DashboardType='complaint'/>
            </div>
        </div>
    );
}

export default ComplaintDashboard;