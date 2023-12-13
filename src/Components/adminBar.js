import React from 'react';
import { Link } from 'react-router-dom';
import './adminBar.css';

const AdminBar = () => {
  return (
    <div className="admin-bar">

      <Link to='/Admin/allUsers'>
       <button> All Users</button>
      </Link>

      <Link to='/Admin/stats'>
       <button>Statistics</button>
      </Link>
      
      <Link to='/Admin/add'>
      <button>Add Admin</button>
      </Link>
      <Link to='/Admin/requests'>
      <button>Requests</button>
      </Link>
      <Link to="/Admin/settings">
      <button>Settings</button>
      </Link>
      <Link to="/" >
      <button>Logout</button>
      </Link>
    </div>
  );
};

export default AdminBar;


/*import React from "react";
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { HomeSVG, StudentClubsSVG,StudentPendingPosts, StudentComplaintsSVG, FileAComplaintSVG,RepsContactsSVG, SettingsSVG  } from "../svg/SvgFiles"; 


//Renders Student Sidebar content
function StudentSidebar()
{
    return(
        <div className='options'>

            <Link to="/Home">
            <div className="SidebarOption" id="Home">
                <div className="SidebarIcon">
                    <HomeSVG/>
                </div>
                <div className="SidebarLabel">
                    <h5>
                        Home
                    </h5>
                </div>
            </div>
            </Link>
            <div className="SidebarOption" id="StudentClubs">
            <div className="SidebarIcon">
                    <StudentClubsSVG/>
                </div>
                <div className="SidebarLabel">
                    <h5>
                        Student Clubs
                    </h5>
                </div>
            </div>
            <div className="SidebarOption" id="FileAComplaint">
                <div className="SidebarIcon">
                        <FileAComplaintSVG/>
                    </div>
                    <div className="SidebarLabel">
                        <h5>
                            Complaints
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
            <div className="SidebarOption" id="Settings">
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
                <div className="SidebarOption" id="Home">
                    <div className="SidebarIcon">
                        <HomeSVG/>
                    </div>
                    <div className="SidebarLabel">
                        <h5>
                            Home
                        </h5>
                    </div>
                </div>
                <div className="SidebarOption" id="StudentClubs">
                <div className="SidebarIcon">
                        <StudentClubsSVG/>
                    </div>
                    <div className="SidebarLabel">
                        <h5>
                            Student Clubs
                        </h5>
                    </div>
                </div>
                <div className="SidebarOption" id="StudentComplaints">
                    <div className="SidebarIcon">
                            <StudentComplaintsSVG/>
                        </div>
                        <div className="SidebarLabel">
                            <h5>
                               Student Complaints
                            </h5>
                        </div>
                    </div>
                <div className="SidebarOption" id="StudentPendingPosts">
                    <div className="SidebarIcon">
                        <StudentPendingPosts/>
                    </div>
                    <div className="SidebarLabel">
                        <h5>
                            Student Pending Posts
                        </h5>
                    </div>
                    </div>
                <div className="SidebarOption" id="Settings">
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

//Sidebar component
function Sidebar(props)
{
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

export default Sidebar;*/