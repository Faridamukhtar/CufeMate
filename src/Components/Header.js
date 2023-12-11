import React from "react";
import './Header.css';

const studentData = {fname:"Ahmed", lname:"Mohamed", major_id:'CCE', std_id:1, class:'2026'}; //get logged in student data

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

function ChooseHeader(props)
{
    if (props.DashboardType==='student' || props.DashboardType==='studentRep')
    {
        return (
            <>
                <StudentHeader studentType={props.DashboardType}/>
            </>
        );
    }
}

export default ChooseHeader;