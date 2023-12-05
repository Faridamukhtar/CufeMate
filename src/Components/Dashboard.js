import React from "react";
import ChooseHeader from "./Header.js";
import './Dashboard.css';
import Posts from './Posts';

function StudentBody()
{
    return (
        <div className='StudentBody'>
            <Posts/>
       </div>
    );
}

function DashboardBody(props)
{
    if (props.DashboardType==='student')
    {
        return (
            <>
                <StudentBody/>
            </>
        );
    }
}

function Dashboard(props)
{
    return (
        <div className="DashboardPage">
            <div className="DashboardHeader">
                <ChooseHeader DashboardType={props.DashboardType}/>
            </div>
            <div className="DashboardBody">
                <DashboardBody DashboardType={props.DashboardType}/>
            </div>
        </div>
    );
}

export default Dashboard;