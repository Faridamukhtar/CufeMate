import React from "react";
import Sidebar from "../Components/Sidebar";
import AdminBar from "../Components/adminBar";
import './StudentSetting.css'
import SettingsBoard from "../Components/SettingsBoard";
import { useParams } from "react-router-dom";


/// student setting pass studentsettings
/// studentclub setting pass studentclubsettings
/// admin setting pass adminsettings

//bb3at prob eh?
const Sidebars =(props)=>
{
    if (props.Type==='Student')
    {
        return (
            <>
                <Sidebar SidebarType='student' studentData={props.student}/>
            </>
        );
    }
    else if (props.Type==='StudentClub')
    {
        return (
            <>
                <Sidebar SidebarType='StudentClubForms'/>
            </>
        );
    }
    else 
    {
        return (
            <>
                <AdminBar/>
            </>
        );
    }
}


const Setting =({DashboardType,Type})=>
{
    let student={std_id:0, fname:'', lname:'', class:2026}
    student = useParams();

    console.log({DashboardType})
    return (
        <div className="StudentPage">
            <div className="sidebar">
                <Sidebars Type={Type} studentData={student}/>
            </div>
            <div className="Dashboard">
                <SettingsBoard DashboardType={DashboardType} studentData={student}/>
            </div>
        </div>
    );
}

export default Setting;