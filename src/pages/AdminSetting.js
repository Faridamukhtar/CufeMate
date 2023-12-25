import React from "react";
import Sidebar from "../Components/Sidebar";
import AdminBar from "../Components/adminBar";
import './StudentSetting.css'
import SettingsBoard from "../Components/SettingsBoard";



const AdminSetting =({DashboardType,Type})=>
{
    
    console.log({DashboardType})
    return (
        <div className="StudentPage">
            <div className="sidebar">
            <AdminBar/>
            </div>
            <div className="Dashboard">
                <SettingsBoard SCData={Data} DashboardType={DashboardType} studentData={Data}/>
            </div>
        </div>
    );
}

export default AdminSetting;