import React from "react";
import ChooseHeader from "./Header.js";
import './Dashboard.css';
import Posts from './Posts';
import WriteComplaint from "./WriteComplaint.js";
import PreviousComplaints from "./PreviousComplaints.js";

function StudentBody(props)
{
    return (
        <div className='StudentBody'>
            <Posts DashboardType={props.DashboardType}/>
       </div>
    );
}

function ComplaintBody(props)
{
    return (
        <div className='ComplaintBody'>
            <div className = 'WriteComplaint'>
                <WriteComplaint Dashboard={props.DashboardType}/>
            </div>
            <div className = 'PreviousComplaints'>
                <PreviousComplaints Dashboard={props.DashboardType}/>
            </div>
        </div>

    );
}

function DashboardBody(props)
{
    if (props.DashboardType==='student' || props.DashboardType==='studentRep')
    {
        return (
            <>
                <StudentBody DashboardType={props.DashboardType}/>
            </>
        );
    }

    if (props.DashboardType==='complaint')
    {
        return (
            <>
                 <ComplaintBody DashboardType={props.DashboardType}/>
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