import React from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './RepsComplaintsDashboard.css'

const RepsComplaintsDashboard =()=>
{
    return (
        <div className="ComplaintPage">
            <div className="sidebar">
                <Sidebar SidebarType='studentRep'/>
            </div>
            <div className="Dashboard">
                <Dashboard DashboardType='repsviewcomplaints'/>
            </div>
        </div>
    );
}

export default RepsComplaintsDashboard;