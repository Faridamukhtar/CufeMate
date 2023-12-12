import React, { useState } from "react";
import ChooseHeader from "./Header.js";
import './Dashboard.css';
import PostSection from './Posts.js';

function StudentBody(props)
{
    return (
        <div className='StudentBody'>
            <PostSection DashboardType={props.DashboardType}/>
       </div>
    );
}

function DashboardBody(props)
{
    if (props.DashboardType==='student' || props.DashboardType==='studentRep')
    {
        return (
            <>
                <StudentBody DashboardType={props.DashboardType} setDashboardType={props.setDashboardType}/>
            </>
        );
    }
    else if (props.DashboardType==='viewstudentclubs')
    {
        
    }


}

function Dashboard(props)
{
    const [DashboardType, setDashboardType] = useState(props.DashboardType);

    return (
        <div className="DashboardPage">
            <div className="DashboardHeader">
                <ChooseHeader DashboardType={DashboardType} studentType={props.studentType}/>
            </div>
            <div className="DashboardBody">
                <DashboardBody DashboardType={DashboardType} setDashboardType={setDashboardType}/>
            </div>
        </div>
    );
}

export default Dashboard;