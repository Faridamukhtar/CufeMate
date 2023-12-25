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
    let Data={};

    if (Type==='StudentClub')
    {
        Data={std_club_id:0, std_club_name:"", email:''};
    }
    else
    {
        Data={std_id:0, fname:'', lname:'', class:2026};
    }

    Data=useParams();



    console.log({DashboardType})
    return (
        <div className="StudentPage">
            <div className="sidebar">
                <Sidebars Type={Type} studentData={Data} SCData={Data}/>
            </div>
            <div className="Dashboard">
                <SettingsBoard SCData={Data} DashboardType={DashboardType} studentData={Data}/>
            </div>
        </div>
    );
}

export default Setting;