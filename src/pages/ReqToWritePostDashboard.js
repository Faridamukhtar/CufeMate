import React from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './ReqToWritePostDashboard.css'

const ReqToWritePostDashboard =()=>
{
    return (
        <div className="ReqWritePostPage">
            <div className="sidebar">
                <Sidebar SidebarType='student'/>
            </div>
            <div className="ReqWriteDashboard">
                <Dashboard DashboardType='reqwritepost'/>
            </div>
        </div>
    );
}

export default ReqToWritePostDashboard;