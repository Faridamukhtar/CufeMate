import React from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './WritePostDashboard.css'
import { useParams } from "react-router-dom";

const WritePostDashboard =()=>
{
    let student={std_id:0, major_id:'', fname:'', lname:'', class:''}
    student = useParams();
    return (
        <div className="WritePostPage">
            <div className="sidebar">
                <Sidebar SidebarType='studentRep' studentData={student}/>
            </div>
            <div className="WriteDashboard">
                <Dashboard DashboardType='writepost'studentData={student}/>
            </div>
        </div>
    );
}

export default WritePostDashboard;