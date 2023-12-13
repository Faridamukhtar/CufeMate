import React, {useState} from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './StudentDashboard.css'

const StudentDashboard =(props)=>
{

    return (
        <div className="StudentPage">
            <div className="sidebar">
                <Sidebar SidebarType='student'/>
            </div>
            <div className="Dashboard">
                <Dashboard DashboardType={props.DashboardType} studentType='student'/>
            </div>
        </div>
    );
}

export default StudentDashboard;