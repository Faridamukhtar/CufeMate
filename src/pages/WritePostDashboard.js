import React from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './WritePostDashboard.css'

const WritePostDashboard =()=>
{
    return (
        <div className="WritePostPage">
            <div className="sidebar">
                <Sidebar SidebarType='studentRep'/>
            </div>
            <div className="WriteDashboard">
                <Dashboard DashboardType='writepost'/>
            </div>
        </div>
    );
}

export default WritePostDashboard;