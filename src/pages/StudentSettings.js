import React from "react";
import Sidebar from "../Components/Sidebar";
import './StudentSetting.css'
import SettingsBoard from "../Components/SettingsBoard";
import { useParams } from "react-router-dom";


/// student setting pass studentsettings
/// studentclub setting pass studentclubsettings
/// admin setting pass adminsettings

const Setting =({DashboardType})=>
{
    let student={std_id:0, fname:'', lname:'', class:2026}
    student = useParams();

    console.log('Ana john cina', student)
    console.log({DashboardType})
    return (
        <div className="StudentPage">
            <div className="sidebar">
                <Sidebar SidebarType='student' studentData={student}/>
            </div>
            <div className="Dashboard">
                <SettingsBoard DashboardType={DashboardType} studentData={student}/>
            </div>
        </div>
    );
}

export default Setting;