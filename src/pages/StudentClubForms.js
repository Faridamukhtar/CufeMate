import React, {useState} from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './StudentClubForms.css'

const StudentClubForms =(props)=>
{

    return (
        <div className="SCFormsPage">
            <div className="sidebar">
                <Sidebar SidebarType={props.DashboardType}/>
            </div>
            <div className="Dashboard">
                <Dashboard DashboardType={props.DashboardType} studentType={props.DashboardType}/>
            </div>
        </div>
    );
}

export default StudentClubForms;