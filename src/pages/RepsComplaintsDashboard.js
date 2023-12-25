import React from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './RepsComplaintsDashboard.css'
import { useParams } from "react-router-dom";

const RepsComplaintsDashboard =()=>
{
    let student={std_id:0, fname:'', lname:'', class:2026}
    student = useParams();
    return (
        <div className="ComplaintPage">
            <div className="sidebar">
                <Sidebar SidebarType='studentRep' studentData={student}/>
            </div>
            <div className="Dashboard">
                <Dashboard DashboardType='repsviewcomplaints' studentData={student}/>
            </div>
        </div>
    );
}

export default RepsComplaintsDashboard;