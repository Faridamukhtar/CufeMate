import './Sidebar.css';
import { Link } from 'react-router-dom';
import { HomeSVG, StudentClubsSVG,StudentPendingPosts, StudentComplaintsSVG, FileAComplaintSVG,RepsContactsSVG, SettingsSVG  } from "../svg/SvgFiles"; 
import React,{ useEffect, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
//Sidebar component
function Sidebar(props)
{
    const navigate=useNavigate();
    //Renders Student Sidebar content
    function StudentSidebar()
    {
        return(
            <div className='options'>
                <div className="SidebarOption" id="Home" onClick={()=>navigate('/student/')}>
                    <div className="SidebarIcon">
                        <HomeSVG/>
                    </div>
                    <div className="SidebarLabel">
                        <h5>
                            Home
                        </h5>
                    </div>
                </div>
                <div className="SidebarOption" id="StudentClubs" onClick={()=>navigate('/student/studentclubs/')}>
                <div className="SidebarIcon">
                        <StudentClubsSVG/>
                    </div>
                    <div className="SidebarLabel">
                        <h5>
                            Student Clubs
                        </h5>
                    </div>
                </div>
                <div className="SidebarOption" id="FileAComplaint" onClick={()=>navigate('/complaints/')}>
                    <div className="SidebarIcon">
                            <FileAComplaintSVG/>
                        </div>
                        <div className="SidebarLabel">
                            <h5>
                                Complaints
                            </h5>
                        </div>
                    </div>
                <div className="SidebarOption" id="FReqToWritePost" onClick={()=>navigate('/reqwritepost')}>
                    <div className="SidebarIcon">
                            <FileAComplaintSVG/>
                        </div>
                        <div className="SidebarLabel">
                            <h5>
                                Request To Write Post
                            </h5>
                        </div>
                    </div>
                <div className="SidebarOption" id="RepsContacts">
                    <div className="SidebarIcon">
                            <RepsContactsSVG/>
                        </div>
                        <div className="SidebarLabel">
                            <h5>
                                Reps Contacts
                            </h5>
                        </div>
                    </div>
                <div className="SidebarOption" id="Settings" onClick={()=>navigate('/StudentSettings/')}>
                <div className="SidebarIcon">
                        <SettingsSVG/>
                    </div>
                    <div className="SidebarLabel">
                        <h5>
                            Settings
                        </h5>
                    </div>
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
                    <div className="SidebarOption" id="Home" onClick={()=>navigate('/rep')}>
                        <div className="SidebarIcon">
                            <HomeSVG/>
                        </div>
                        <div className="SidebarLabel">
                            <h5>
                                Home
                            </h5>
                        </div>
                    </div>
                    <div className="SidebarOption" id="StudentClubs" onClick={()=>navigate('/rep/studentclubs')}>
                    <div className="SidebarIcon">
                            <StudentClubsSVG/>
                        </div>
                        <div className="SidebarLabel">
                            <h5>
                                Student Clubs
                            </h5>
                        </div>
                    </div>
                    <div className="SidebarOption" id="StudentComplaints" onClick ={()=> navigate('/repsviewcomplaints')}>
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
                    <div className="SidebarOption" id="Settings" onClick={()=>navigate('/StudentSettings/')}>
                    <div className="SidebarIcon">
                            <SettingsSVG/>
                        </div>
                        <div className="SidebarLabel">
                            <h5>
                                Settings
                            </h5>
                        </div>
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
                    <StudentSidebar/>
                </>
            );
        }
        if (props.SidebarType==='studentRep')
        {
            return (
                <>
                    <StudentRepSidebar/>
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
                <ChooseSidebar SidebarType={props.SidebarType}/>
            </div>
        </div>
    )
}

export default Sidebar;
