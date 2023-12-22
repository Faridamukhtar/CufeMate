import React from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './ViewPostReqDashboard.css'

const ViewPostReqDashboard =()=>
{
    return (
        <div className="ComplaintPage">
            <div className="sidebar">
                <Sidebar SidebarType='studentRep'/>
            </div>
            <div className="Dashboard">
                <Dashboard DashboardType='viewpostreq'/>
            </div>
        </div>
    );
}

export default ViewPostReqDashboard;