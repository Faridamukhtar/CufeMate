import React from "react";
import Sidebar from "../Components/Sidebar";
import './StudentSetting.css'
import RequestRepForm from "../Components/RequestRepForm";

const ApplyToBeRep =()=>
{
    return (
        <div className="StudentPage">
            <div className="sidebar">
                <Sidebar SidebarType='student'/>
            </div>
            <div className="Dashboard">
                <RequestRepForm DashboardType='studentsettings'/>
            </div>
        </div>
    );
}

export default ApplyToBeRep;