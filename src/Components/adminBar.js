import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { HomeSVG, StudentClubsSVG,StudentPendingPosts, StudentComplaintsSVG, FileAComplaintSVG,RepsContactsSVG, SettingsSVG  } from "../svg/SvgFiles"; 
import './adminBar.css';
  
const AdminBar = ({ props }) => {
    const adminID = props;
    console.log("ana fl adminbar",adminID);
    const navigate = useNavigate(); // Initialize the navigate hook
  return (
    <div className="admin-bar">
        <div className="Header">
                <h2 className="cufemate">
                    CufeMate
                </h2>
            </div>
        <div className='option' onClick={()=> navigate(`/AdminDashboard/${adminID}`)}> 
            <div className="SidebarIcon">
                <HomeSVG/>
            </div>
            <div className="SidebarLabel">
                <h5>All Users</h5>
            </div>
        </div>
        <div className='option' onClick={()=> navigate(`/Admin/stats/${adminID}`)}>
            <div className="SidebarIcon">
                <StudentClubsSVG/>
            </div>
            <div className="SidebarLabel">
                <h5>Statistics</h5>
            </div> 
        </div>
        <div className='option' onClick={()=> navigate(`/Admin/add/${adminID}`)}>
            <div className="SidebarIcon">
                <FileAComplaintSVG/>
            </div>
            <div className="SidebarLabel">
                <h5>Add Admin </h5>
            </div>
        </div>
        <div className='option' onClick={()=> navigate(`/Admin/requests/${adminID}`)}>
           
            <div className="SidebarIcon">
                            <RepsContactsSVG/>
                        </div>
                        <div className="SidebarLabel">
                            <h5>
                            Requests
                            </h5>
                        </div>
        </div>
        <div className='option' onClick={()=> navigate(`/Admin/settings/${adminID}`)}>
            <div className="SidebarIcon">
                <SettingsSVG/>
            </div>
            <div className="SidebarLabel">
                <h5>Settings</h5>
            </div>
        </div>
        <Link to="/" >
        <div className='option'>
            <div className="SidebarLabel">
                <h5>Logout</h5>
            </div>   
        </div>
        </Link>
    </div>
  );
};

export default AdminBar;