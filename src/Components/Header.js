import React from "react";
import './Header.css';
import ViewPostReqDashboard from "../pages/ViewPostReqDashboard";


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
                    {props.studentData.fname} {props.studentData.lname}
                </h4>
                <h4>
                    Class of {props.studentType=='student' ? props.studentData.class : props.studentData.class + ' Rep'}
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
                    {props.studentData.fname} {props.studentData.lname}
                </h4>
                <h4>
                    Class of {props.studentType=='student' ? props.studentData.class : props.studentData.class + ' Rep'}
                </h4>
            </div>
        </div>
    );
}

function StudentSettingsHeader(props)
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
function StudentClubSettingsHeader(props)
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
                    {props.SCData.std_club_name}
                </h4>
                <h4>
                    {props.SCData.email}
                </h4>
            </div>
        </div>
    );
}



function ComplaintHeader(props)
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
                    Class of  {props.studentData.class}
                </h4>
            </div>
        </div>

    );
}
function StudentClub(props)
{
    return (
        <div className="StudentHeader">
            <div className="greeting">
                <h1>
                Club Statistics 
                </h1>
            </div>
            <div className="Info">
                <h4 className='StudentName'>
                    {props.SCData.std_club_name}
                </h4>
                <h4>
                    {props.SCData.email}
                </h4>
            </div>
        </div>

    );
}


function StudentClubFormsHeader(props)
{
    return (
        <div className="StudentHeader">
            <div className="greeting">
                <h1>
                    Forms
                </h1>
                <h3>
                    The Data You Need In One Place.
                </h3>
            </div>
            <div className="Info">
                <h4 className='StudentName'>
                    {props.SCData.std_club_name}
                </h4>
                <h4>
                    {props.SCData.email}
                </h4>
            </div>
        </div>

    );
}

function RepsViewComplaintsHeader(props)
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
                Class of  {props.studentData.class}
            </h4>
        </div>
    </div>


    );
}

function WritePostHeader(props)
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
                    Class of  {props.studentData.class}
                </h4>
            </div>
        </div>

    );
}

function ReqWritePostHeader(props)
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
                    Class of  {props.studentData.class}
                </h4>
            </div>
        </div>

    ); 
}

function ViewPostReqHeader(props)
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
                    Class of  {props.studentData.class}
                </h4>
            </div>
        </div>

    ); 
}





function RepsContactsHeader(props)

{
    return (
        <div className="StudentHeader">
            <div className="greeting">
                <h1>
                    Contacts
                </h1>
                <h3>
                    Reps of class {props.studentData.class}, major {props.studentData.major_id}.
                </h3>
            </div>
            <div className="Info">
                <h4 className='StudentName'>
                    {props.studentData.fname} {props.studentData.lname}
                </h4>
                <h4>
                    Class of {props.studentData.class}
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
                <StudentHeader studentType={props.studentType} studentData={props.studentData}/>
            </>
        );
    }
    else if  (props.DashboardType==='studentsettings'  || props.DashboardType==='adminsettings')
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
                <ViewStudentClubsHeader studentType={props.studentType} studentData={props.studentData}/>
            </>
        );
    }

    else if (props.DashboardType==='reps_contacts')
    {
        return (
            <>
              <RepsContactsHeader studentData={props.studentData}/>
             </>
          );
     }

    else if (props.DashboardType==='complaint')
    {
        return (
            <>
                <ComplaintHeader studentData={props.studentData} />
            </>
        );
    }
    else if (props.DashboardType==='StudentClub')
    {
        return (
            <>
                <StudentClub SCData={props.SCData}/>
            </>
        );
    }
    else if (props.DashboardType==='studentclubsettings')
    {
        return (
            <>
                <StudentClubSettingsHeader SCData={props.SCData}/>
            </>
        );
    }

    else if (props.DashboardType==='repsviewcomplaints')
    {
        return (
            <>
               <RepsViewComplaintsHeader studentData={props.studentData}/>
            </>
        )
    }


    else if (props.DashboardType==='writepost')
    {
        return (
             <>
                <WritePostHeader studentData={props.studentData} />
             </>
        );
    }
    else if (props.DashboardType==='reqwritepost')
    {
        return (
           <>
               <ReqWritePostHeader studentData={props.studentData} />
           </>
        );
    }
    else if (props.DashboardType==='viewpostreq')
    {
        return (
            <>
               <ViewPostReqHeader studentData={props.studentData} />
            </>
        );
    }

    else if (props.DashboardType==='StudentClubForms')
    {
        return (
            <>
               <StudentClubFormsHeader SCData={props.SCData}/>
            </>
        )
    }

}

export default ChooseHeader;