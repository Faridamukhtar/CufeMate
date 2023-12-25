import './Sidebar.css';
import { Link } from 'react-router-dom';
import { HomeSVG, StudentClubsSVG,StudentPendingPosts, StudentComplaintsSVG, FileAComplaintSVG,RepsContactsSVG, SettingsSVG  } from "../svg/SvgFiles"; 
import React,{ useEffect, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import PreviousPosts from './ViewPreviousPosts';
//Sidebar component
function Sidebar(props)
{
    const navigate=useNavigate();

    //Renders Student Clubs Sidebar
    function StudentClubsSidebar()
    {
        return (
        <>
            <div className='options'>
                    <div className="SidebarOption" id="SCHome" onClick={()=>navigate(`/StudentClubStatistics/${props.SCData.std_club_id}/${props.SCData.std_club_name}/${props.SCData.email}/`)}>
                        <div className="SidebarIcon">
                            <HomeSVG/>
                        </div>
                        <div className="SidebarLabel">
                            <h5>
                                Home
                            </h5>
                        </div>
                    </div>
                    <div className="SidebarOption" id="StudentClubs" onClick={()=>navigate(`/StudentClub/Forms/${props.SCData.std_club_id}/${props.SCData.std_club_name}/${props.SCData.email}/`)}>
                        <div className="SidebarIcon">
                            <StudentClubsSVG/>
                        </div>
                        <div className="SidebarLabel">
                            <h5>
                                Student Club Forms
                            </h5>
                        </div>
                    </div>
                    <div className="SidebarOption" id="Settings" onClick={()=>navigate(`/StudentClubSettings/${props.SCData.std_club_id}/${props.SCData.std_club_name}/${props.SCData.email}/`)}>
                        <div className="SidebarIcon">
                            <SettingsSVG/>
                        </div>
                        <div className="SidebarLabel">
                            <h5>
                                Settings
                            </h5>
                        </div>
                    </div>
                    <div className="SidebarOption" id="Logout">
                        <Link to="/" >
                        <div className="SidebarLabel">
                            <h5>Logout</h5>  
                        </div>
                        </Link>
                    </div>
            </div>
        </>);
    }



    //Renders Student Sidebar content
    function StudentSidebar(props)
    {
        return(
            <div className='options'>
                <div className="SidebarOption" id="Home" onClick={()=>navigate(`/student/${props.studentData.std_id}/${props.studentData.major_id}/${props.studentData.fname}/${props.studentData.lname}/${props.studentData.class}/`)}>
                    <div className="SidebarIcon">
                        <HomeSVG/>
                    </div>
                    <div className="SidebarLabel">
                        <h5>
                            Home
                        </h5>
                    </div>
                </div>
                <div className="SidebarOption" id="StudentClubs" onClick={()=>navigate(`/student/studentclubs/${props.studentData.std_id}/${props.studentData.major_id}/${props.studentData.fname}/${props.studentData.lname}/${props.studentData.class}/`)}>
                <div className="SidebarIcon">
                        <StudentClubsSVG/>
                    </div>
                    <div className="SidebarLabel">
                        <h5>
                            Student Clubs
                        </h5>
                    </div>
                </div>
                <div className="SidebarOption" id="FileAComplaint" onClick={()=>navigate(`/complaints/${props.studentData.std_id}/${props.studentData.major_id}/${props.studentData.fname}/${props.studentData.lname}/${props.studentData.class}`)}>
                    <div className="SidebarIcon">
                            <FileAComplaintSVG/>
                        </div>
                        <div className="SidebarLabel">
                            <h5>
                                Complaints
                            </h5>
                        </div>
                    </div>
                <div className="SidebarOption" id="FReqToWritePost" onClick={()=>navigate(`/reqwritepost/${props.studentData.std_id}/${props.studentData.major_id}/${props.studentData.fname}/${props.studentData.lname}/${props.studentData.class}`)}>
                    <div className="SidebarIcon">
                            <FileAComplaintSVG/>
                        </div>
                        <div className="SidebarLabel">
                            <h5>
                                Request To Write Post
                            </h5>
                        </div>
                    </div>
                <div className="SidebarOption" id="RepsContacts" onClick={()=>navigate(`/reps_contacts/${props.studentData.std_id}/${props.studentData.major_id}/${props.studentData.fname}/${props.studentData.lname}/${props.studentData.class}`)}>
                    <div className="SidebarIcon">
                            <RepsContactsSVG/>
                        </div>
                        <div className="SidebarLabel">
                            <h5>
                                Reps Contacts
                            </h5>
                        </div>
                    </div>
                <div className="SidebarOption" id="Settings" onClick={()=>navigate(`/StudentSettings/${props.studentData.std_id}/${props.studentData.major_id}/${props.studentData.fname}/${props.studentData.lname}/${props.studentData.class}`)}>
                <div className="SidebarIcon">
                        <SettingsSVG/>
                    </div>
                    <div className="SidebarLabel">
                        <h5>
                            Settings
                        </h5>
                    </div>
                </div>
                <div className="SidebarOption" id="Logout">
                    <Link to="/" >
                    <div className="SidebarLabel">
                        <h5>Logout</h5>  
                    </div>
                    </Link>
                </div>
            </div>
        );
    }

    //Renders Rep Sidebar content
    function StudentRepSidebar()
    {
        return (
        <>
            <div className='options'>
                    <div className="SidebarOption" id="RHome" onClick={()=>navigate('/rep')}>
                        <div className="SidebarIcon">
                            <HomeSVG/>
                        </div>
                        <div className="SidebarLabel">
                            <h5>
                                Home
                            </h5>
                        </div>
                    </div>
                    <div className="SidebarOption" id="RStudentClubs" onClick={()=>navigate('/rep/studentclubs')}>
                    <div className="SidebarIcon">
                            <StudentClubsSVG/>
                        </div>
                        <div className="SidebarLabel">
                            <h5>
                                Student Clubs
                            </h5>
                        </div>
                    </div>
                    <div className="SidebarOption" id="RStudentComplaints" onClick ={()=> navigate('/repsviewcomplaints')}>
                        <div className="SidebarIcon">
                                <StudentComplaintsSVG/>
                            </div>
                            <div className="SidebarLabel">
                                <h5>
                                Student Complaints
                                </h5>
                            </div>
                        </div>

                    <div className="SidebarOption" id="WritePost" onClick={()=>navigate('/writepost')}>
                        <div className="SidebarIcon">
                            <FileAComplaintSVG/>
                        </div>
                        <div className="SidebarLabel">
                            <h5>
                                 Write Post
                            </h5>
                        </div>
                    </div>    
                    <div className="SidebarOption" id="StudentPendingPosts" onClick ={()=>navigate('/viewpostreq')}>

                        <div className="SidebarIcon">
                            <StudentPendingPosts/>
                        </div>
                        <div className="SidebarLabel">
                            <h5>
                                Student Pending Posts
                            </h5>
                        </div>
                        </div>
                    <div className="SidebarOption" id="RSettings" onClick={()=>navigate('/StudentSettings/')}>
                    <div className="SidebarIcon">
                            <SettingsSVG/>
                        </div>
                        <div className="SidebarLabel">
                            <h5>
                                Settings
                            </h5>
                        </div>
                    </div>
                    <div className="SidebarOption" id="Logout">
                        <Link to="/" >
                        <div className="SidebarLabel">
                            <h5>Logout</h5>  
                        </div>
                        </Link>
                    </div>
                </div>
        </>);
    }

    //Chooses the sidebar content to be rendered
    function ChooseSidebar(props)
    {
        if (props.SidebarType==='student')
        {
            return (
                <>
                    <StudentSidebar studentData={props.studentData}/>
                </>
            );
        }
        if (props.SidebarType==='studentRep')
        {
            return (
                <>
                    <StudentRepSidebar studentData={props.studentData}/>
                </>
            );
        }
        if (props.SidebarType==='StudentClubForms')
        {
            return (
                <>
                    <StudentClubsSidebar SCData={props.SCData}/>
                </>
            );
        }
        
    }

    return (
        <div className="SideBar">
            <div className="Header">
                <h2 className="cufemate">
                    CufeMate
                </h2>
            </div>
            <div className="nav-options">
                <ChooseSidebar studentData={props.studentData} SidebarType={props.SidebarType}/>
            </div>
        </div>
    )
}

export default Sidebar;