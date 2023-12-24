import React from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './ComplaintDashboard.css'
import { useParams } from "react-router-dom";

const ComplaintDashboard =()=>
{
    let student={std_id:0, fname:'', lname:'', class:2026}
    student = useParams();
    return (
        <div className="ComplaintPage">
            <div className="sidebar">
                <Sidebar SidebarType='student' studentData={student}/>
            </div>
            <div className="Dashboard">
                <Dashboard DashboardType='complaint' studentData={student}/>
            </div>
        </div>
    );
}

export default ComplaintDashboard;