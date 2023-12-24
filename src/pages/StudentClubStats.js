import React from "react";
import Sidebar from "../Components/Sidebar";
import './ComplaintDashboard.css'
import Clubstat from "../Components/Clubsstat"

const StudentClubStatistics =({DashboardType})=>
{
    console.log({DashboardType})
    return (
        <div className="StudentPage">
            <div className="sidebar">
                <Sidebar SidebarType='StudentClubForms'/>
            </div>
            <div className="Dashboard">
                <Clubstat DashboardType={DashboardType}/>
            </div>
        </div>
    );
}


export default StudentClubStatistics;