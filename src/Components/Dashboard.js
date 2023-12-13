import React from "react";
import ChooseHeader from "./Header.js";
import './Dashboard.css';
import Posts from './Posts';
import Contacts from './Contacts.js';

function StudentBody(props)
{
    return (
        <div className='StudentBody'>
            <Posts DashboardType={props.DashboardType}/>
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
    if (props.DashboardType==='reps_contacts')
    {
        return(
            <>
                <RepsContactsBody DashboardType={props.DashboardType}/>
            </>

        );
    }


}

function Dashboard(props)
{
    return (
        <div className="DashboardPage">
            <div className="DashboardHeader">
                <ChooseHeader DashboardType={props.DashboardType}/>
            </div>
            <div className="DashboardBody">
                <DashboardBody DashboardType={props.DashboardType}/>
            </div>
        </div>
    );
}

export default Dashboard;