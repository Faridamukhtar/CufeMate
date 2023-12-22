import React, { useState } from "react";
import ChooseHeader from "./Header.js";
import './Dashboard.css';
import Posts from './Posts';
import Contacts from './Contacts.js';
import WriteComplaint from "./WriteComplaint.js";
import PreviousComplaints from "./PreviousComplaints.js";
import PostSection from './Posts.js';
import ViewStudentClubs from './ViewStudentClubs.js';
import RepsViewComplaints from './RepsViewComplaints.js';

import ChooseCourse from './ChooseCourse.js';
import ViewPreviousPosts from './ViewPreviousPosts.js';
import ViewPreviousReqPosts from './ViewPreviousReqPosts.js';
import ChooseCourseReq from './ChooseCourseReq.js';
import ViewPostReq from './ViewPostReq.js';


import StudentClubForms from './StudentClubForms.js'



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
            <ViewStudentClubs/>
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

function StudentClubFormsBody (props)
{
    return (
        <div className='ViewStudentClubsBody'>
            <StudentClubForms studentType={props.studentType}/>
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

function WritePostBody(props)
{
    return(
        <div className="WritePostBody">
            <div className="ChooseCourse">
                <ChooseCourse Dashboard={props.DashboardType}/>
            </div>
            
             <div className="ViewPreviousPosts">
                <ViewPreviousPosts Dashboard={props.DashboardType}/>
             </div>
        </div>

    );
}

function ReqWritePostBody(props)
{
    return (
        <div className="ReqWritePostBody">
            <div className="ChooseCourse">
                <ChooseCourseReq Dashboard={props.DashboardType}/>
            </div>
            
             <div className="ViewPreviousReqPosts">
                <ViewPreviousReqPosts Dashboard={props.DashboardType}/>
             </div>
        </div>
    );
}

function ViewPostReqBody(props)
{
    return (
            <div className='ViewPostReqBody'>
                <ViewPostReq Dashboard={props.DashboardType}/>
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

    else if (props.DashboardType==='writepost')
    {
        return (
            <>
               <WritePostBody DashboardType={props.DashboardType}/>
            </>
        );
    }
    else if (props.DashboardType==='reqwritepost')
    {
        return (
            <>
              <ReqWritePostBody DashboardType={props.DashboardType}/>
            </>

        );
    }
    else if (props.DashboardType==='viewpostreq')
    {
        return (
            <>
               <ViewPostReqBody DashboardType={props.DashboardType}/>

    else if (props.DashboardType==='StudentClubForms')
    {
        return (
            <>
              <StudentClubFormsBody DashboardType={props.DashboardType}/>

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