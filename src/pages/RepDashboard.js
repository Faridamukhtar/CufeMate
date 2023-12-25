import React from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './StudentDashboard.css'
import { useParams } from 'react-router-dom';

const RepDashboard =(props)=>
{
    let rep={std_id:0, fname:'', lname:'', class:2026}
    rep = useParams();
    console.log('Ana rep', rep);

    return (
        <div className="StudentPage">
            <div className="sidebar">
                <Sidebar repData={rep} SidebarType='studentRep'/>
            </div>
            <div className="Dashboard">
                <Dashboard DashboardType={props.DashboardType} studentType='studentRep' repData={rep}/>
            </div>
        </div>
    );
}

export default RepDashboard;