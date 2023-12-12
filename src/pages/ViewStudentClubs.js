import React from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import './ViewStudentClub.css'

const ViewStudentClubs =(props)=>
{
    return (
        <div className="ViewStudentClubPage">
            <div className="sidebar">
                <Sidebar SidebarType={props.DashboardType}/>
            </div>
            <div className="ViewStudentClub">

            </div>
        </div>
    );
}

export default ViewStudentClubs;