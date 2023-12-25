import React, {useState} from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './StudentClubForms.css'
import { useParams } from "react-router-dom";

const StudentClubForms =(props)=>
{
    let SCData={std_club_id:0, std_club_name:"", email:''}
    SCData = useParams();

    return (
        <div className="SCFormsPage">
            <div className="sidebar">
                <Sidebar SidebarType={props.DashboardType} SCData={SCData}/>
            </div>
            <div className="Dashboard">
                <Dashboard DashboardType={props.DashboardType} studentType={props.DashboardType} SCData={SCData}/>
            </div>
        </div>
    );
}

export default StudentClubForms;