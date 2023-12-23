import React from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './ReqToWritePostDashboard.css'
import { useParams } from "react-router-dom";

const ReqToWritePostDashboard =()=>
{
    let student={std_id:0, fname:'', lname:'', class:2026}
    student = useParams();

    return (
        <div className="ReqWritePostPage">
            <div className="sidebar">
                <Sidebar SidebarType='student' studentData={student}/>
            </div>
            <div className="ReqWriteDashboard">
                <Dashboard DashboardType='reqwritepost' studentData={student}/>
            </div>
        </div>
    );
}

export default ReqToWritePostDashboard;