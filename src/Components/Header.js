import React from "react";
import './Header.css';
import ViewPostReqDashboard from "../pages/ViewPostReqDashboard";

const studentData = {fname:"Ahmed", lname:"Mohamed", major_id:'CCE', std_id:1, class:'2026'}; //get logged in student data

function ViewStudentClubsHeader(props)
{
    return (
        <div className="ViewStudentClubsHeader">
            <div className="greeting">
                <h1>
                    Student Clubs
                </h1>
                <h3>
                    A Complete Guide To On-Campus Activities
                </h3>
            </div>
            <div className="Info">
                <h4 className='StudentName'>
                    {studentData.fname} {studentData.lname}
                </h4>
                <h4>
                    Class of {props.studentType=='student' ? studentData.class : studentData.class + ' Rep'}
                </h4>
            </div>
        </div>
    );
}


function StudentHeader(props)
{
    return (
        <div className="StudentHeader">
            <div className="greeting">
                <h1>
                    Hi, Handasa!
                </h1>
                <h3>
                    Welcome To Your Favorite UniGuide.
                </h3>
            </div>
            <div className="Info">
                <h4 className='StudentName'>
                    {studentData.fname} {studentData.lname}
                </h4>
                <h4>
                    Class of {props.studentType=='student' ? studentData.class : studentData.class + ' Rep'}
                </h4>
            </div>
        </div>
    );
}

function StudentSettingsHeader()
{
    return (
        <div className="StudentHeader">
            <div className="greeting">
                <h1>
                    Settings
                </h1>
            </div>
            <div className="Info">
                <h4 className='StudentName'>
                    Name
                </h4>
                <h4>
                    Class of XXXX
                </h4>
            </div>
        </div>
    );
}

function ComplaintHeader()
{
    return (
        <div className="StudentHeader">
            <div className="greeting">
                <h1>
                    Complaints
                </h1>
            </div>
            <div className="Info">
                <h4 className='StudentName'>
                    Name
                </h4>
                <h4>
                    Class of XXXX
                </h4>
            </div>
        </div>

    );
}

function RepsViewComplaintsHeader()
{
    return (
        <div className="StudentHeader">
        <div className="greeting">
            <h1>
                View Complaints
            </h1>
        </div>
        <div className="Info">
            <h4 className='StudentName'>
                Name
            </h4>
            <h4>
                Class of XXXX
            </h4>
        </div>
    </div>


    );
}

function WritePostHeader()
{
    return (
        <div className="StudentHeader">
            <div className="greeting">
                <h1>
                    Write a Post
                </h1>
            </div>
            <div className="Info">
                <h4 className='StudentName'>
                    Name
                </h4>
                <h4>
                    Class of XXXX
                </h4>
            </div>
        </div>

    );
}

function ReqWritePostHeader()
{
    return (
        <div className="StudentHeader">
            <div className="greeting">
                <h1>
                   Request To Write a Post
                </h1>
            </div>
            <div className="Info">
                <h4 className='StudentName'>
                    Name
                </h4>
                <h4>
                    Class of XXXX
                </h4>
            </div>
        </div>

    ); 
}

function ViewPostReqHeader()
{
    return (
        <div className="StudentHeader">
            <div className="greeting">
                <h1>
                   View Students Post Requests
                </h1>
            </div>
            <div className="Info">
                <h4 className='StudentName'>
                    Name
                </h4>
                <h4>
                    Class of XXXX
                </h4>
            </div>
        </div>

    ); 
}




function ChooseHeader(props)
{
    if (props.DashboardType==='student' || props.DashboardType==='studentRep')
    {
        return (
            <>
                <StudentHeader studentType={props.studentType}/>
            </>
        );
    }
    else if  (props.DashboardType==='studentsettings' ||  props.DashboardType==='studentclubsettings')
    {
        return (
            <>
                <StudentSettingsHeader />
            </>
        );
    }
    else if (props.DashboardType==='viewstudentclubs' )
    {
        return (
            <>
                <ViewStudentClubsHeader studentType={props.studentType}/>
            </>
        );
    }

    else if (props.DashboardType==='complaint')
    {
        return (
            <>
                <ComplaintHeader/>
            </>
        );
    }

    else if (props.DashboardType==='repsviewcomplaints')
    {
        return (
            <>
               <RepsViewComplaintsHeader/>
            </>
        )
    }

    else if (props.DashboardType==='writepost')
    {
        return (
             <>
                <WritePostHeader/>
             </>
        );
    }
    else if (props.DashboardType==='reqwritepost')
    {
        return (
           <>
               <ReqWritePostHeader/>
           </>
        );
    }
    else if (props.DashboardType==='viewpostreq')
    {
        return (
            <>
               <ViewPostReqHeader/>
            </>
        );
    }

}

export default ChooseHeader;