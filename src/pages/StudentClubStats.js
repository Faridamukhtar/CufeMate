import React from "react";
import Sidebar from "../Components/Sidebar";
import './ComplaintDashboard.css'
import Clubstat from "../Components/Clubsstat"
import { useParams } from "react-router-dom";

const StudentClubStatistics =({DashboardType})=>
{
    let SCData={std_club_id:0, std_club_name:'', email:''}
    SCData = useParams();
    
    console.log(SCData)
    console.log({DashboardType})
    return (
        <div className="StudentPage">
            <div className="sidebar">
                <Sidebar SidebarType='StudentClubForms' SCData={SCData}/>
            </div>
            <div className="Dashboard">
                <Clubstat DashboardType={DashboardType} SCData={SCData}/>
            </div>
        </div>
    );
}


export default StudentClubStatistics;