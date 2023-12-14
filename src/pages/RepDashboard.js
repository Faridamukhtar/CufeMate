import React, {useState} from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './StudentDashboard.css'

const RepDashboard =(props)=>
{

    return (
        <div className="StudentPage">
            <div className="sidebar">
                <Sidebar SidebarType='studentRep'/>
            </div>
            <div className="Dashboard">
                <Dashboard DashboardType={props.DashboardType} studentType='studentRep'/>
            </div>
        </div>
    );
}

export default RepDashboard;