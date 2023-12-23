import React, {useState} from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './StudentDashboard.css'
import { useParams } from 'react-router-dom';

const StudentDashboard =(props)=>
{
    const { student } = useParams();
    console.log("ana fl dashboard", student);

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