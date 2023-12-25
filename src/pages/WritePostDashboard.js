import React from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './WritePostDashboard.css'
import { useParams } from "react-router-dom";

const WritePostDashboard =()=>
{
    let rep={std_id:0,major_id:'', fname:'', lname:'', class:''}
    rep = useParams();
    return (
        <div className="WritePostPage">
            <div className="sidebar">
                <Sidebar SidebarType='studentRep' repData={rep}/>
            </div>
            <div className="WriteDashboard">
                <Dashboard DashboardType='writepost' repData={rep}/>
            </div>
        </div>
    );
}

export default WritePostDashboard;