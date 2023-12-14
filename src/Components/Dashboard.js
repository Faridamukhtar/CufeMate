import React, { useState } from "react";
import ChooseHeader from "./Header.js";
import './Dashboard.css';
import Posts from './Posts';
import Contacts from './Contacts.js';
import PostSection from './Posts.js';
import ViewStudentClubs from './ViewStudentClubs.js';



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


function RepsContactsBody(props)
{
    return (
        <div className='RepsContactsBody'>
            <Contacts DashboardType={props.DashboardType}/>
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

    else if (props.DashboardType==='reps_contacts')
    {
        return(
            <>
                <RepsContactsBody DashboardType={props.DashboardType}/>
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