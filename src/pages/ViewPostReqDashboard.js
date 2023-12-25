import React from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './ViewPostReqDashboard.css'
import { useParams } from "react-router-dom";

const ViewPostReqDashboard =()=>
{
    let student={std_id:0,major_id:'', fname:'', lname:'', class:''}
    student = useParams();
    return (
        <div className="ComplaintPage">
            <div className="sidebar">
                <Sidebar SidebarType='studentRep' studentData={student}/>
            </div>
            <div className="Dashboard">
                <Dashboard DashboardType='viewpostreq' studentData={student}/>
            </div>
        </div>
    );
}

export default ViewPostReqDashboard;