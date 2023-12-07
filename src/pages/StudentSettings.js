import React from "react";
import Sidebar from "../Components/Sidebar";
import './StudentSetting.css'
import SettingsBoard from "../Components/SettingsBoard";

const StudentSetting =()=>
{
    return (
        <div className="StudentPage">
            <div className="sidebar">
                <Sidebar SidebarType='student'/>
            </div>
            <div className="Dashboard">
                <SettingsBoard DashboardType='studentsettings'/>
            </div>
        </div>
    );
}

export default StudentSetting;