import React from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './ViewPostReqDashboard.css'
import { useParams } from "react-router-dom";

const ViewPostReqDashboard =()=>
{
    let rep={std_id:0,major_id:'', fname:'', lname:'', class:''}
    rep = useParams();
    return (
        <div className="ComplaintPage">
            <div className="sidebar">
                <Sidebar SidebarType='studentRep' studentData={rep}/>
            </div>
            <div className="Dashboard">
                <Dashboard DashboardType='viewpostreq' studentData={rep}/>
            </div>
        </div>
    );
}

export default ViewPostReqDashboard;