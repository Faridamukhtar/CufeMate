import React, {useState} from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";
import { useParams } from 'react-router-dom';

import './StudentDashboard.css'
import { useParams } from 'react-router-dom';

const StudentDashboard =(props)=>
{

    let student={std_id:0, fname:'', lname:'', class:2026}
    student = useParams();

    console.log('Ana john cina', student)


    return (
        <div className="StudentPage">
            <div className="sidebar">
                <Sidebar SidebarType='student' studentData={student}/>
            </div>
            <div className="Dashboard">
                <Dashboard studentData={student} DashboardType={props.DashboardType} studentType='student'/>
            </div>
        </div>
    );
}

export default StudentDashboard;