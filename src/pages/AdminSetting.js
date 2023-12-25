import React from "react";
import AdminBar from "../Components/adminBar";
import './StudentSetting.css'
import SettingsBoard from "../Components/SettingsBoard";
import { useParams } from 'react-router-dom';

const AdminSetting =({DashboardType,Type})=>
{
    const { admin_id } = useParams();//pass AdminID to the component
    console.log({DashboardType})
    return (
        <div className="StudentPage">
            <div className="bar">
            <AdminBar props={admin_id}/>
            </div>
            <div className="Dashboard">
                <SettingsBoard DashboardType={DashboardType} />
            </div>
        </div>
    );
}

export default AdminSetting;