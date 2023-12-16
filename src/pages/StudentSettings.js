import React from "react";
import Sidebar from "../Components/Sidebar";
import './StudentSetting.css'
import SettingsBoard from "../Components/SettingsBoard";



/// student setting pass studentsettings
/// studentclub setting pass studentclubsettings
/// admin setting pass adminsettings

const Setting =({DashboardType})=>
{
    console.log({DashboardType})
    return (
        <div className="StudentPage">
            <div className="sidebar">
                <Sidebar SidebarType='student'/>
            </div>
            <div className="Dashboard">
                <SettingsBoard DashboardType={DashboardType}/>
            </div>
        </div>
    );
}

export default Setting;