import React, {useState} from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './StudentDashboard.css'

const RepDashboard =()=>
{
    const [DashboardType, setDashboardType]=useState('studentRep');

    return (
        <div className="StudentPage">
            <div className="sidebar">
                <Sidebar SidebarType='student' setOnClickNav={setDashboardType}/>
            </div>
            <div className="Dashboard">
                <Dashboard DashboardType={DashboardType} studentType='studentRep'/>
            </div>
        </div>
    );
}

export default RepDashboard;