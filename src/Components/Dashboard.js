import React, { useState } from "react";
import ChooseHeader from "./Header.js";
import './Dashboard.css';
import WriteComplaint from "./WriteComplaint.js";
import PreviousComplaints from "./PreviousComplaints.js";
import PostSection from './Posts.js';
import ViewStudentClubs from './ViewStudentClubs.js';
import RepsViewComplaints from './RepsViewComplaints.js';


function StudentBody(props)
{
    return (
        <div className='StudentBody'>
            <PostSection studentType={props.studentType}/>
       </div>
    );
}

function ViewStudentClubsBody (props)
{
    return (
        <div className='ViewStudentClubsBody'>
            <ViewStudentClubs studentType={props.studentType}/>
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

function RepsViewComplaintsBody(props)
{
    return (
        <div className='RepsViewComplaintsBody'>
             <RepsViewComplaints DashboardType={props.DashboardType}/>
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
    else if (props.DashboardType==='viewstudentclubs')
    {
        return (
            <>
                <ViewStudentClubsBody DashboardType={props.DashboardType}/>
            </>
        );
    }
   else if (props.DashboardType==='complaint')
    {
        return (
            <>
                 <ComplaintBody DashboardType={props.DashboardType}/>
            </>
        );
        
    }
    else if (props.DashboardType==='repsviewcomplaints')
    {
        return (
            <>
              <RepsViewComplaintsBody DashboardType={props.DashboardType}/>
            </>
        );
    }

}


function Dashboard(props)
{
    return (
        <div className="DashboardPage">
            <div className="DashboardHeader">
                <ChooseHeader DashboardType={props.DashboardType} studentType={props.studentType}/>
            </div>
            <div className="DashboardBody">
                <DashboardBody DashboardType={props.DashboardType}/>
            </div>
        </div>
    );
}

export default Dashboard;