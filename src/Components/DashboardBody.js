import React from 'react';
import './DashboardBody.css';
import Posts from './Posts';

function StudentBody()
{
    return (
        <div className='StudentBody'>
            <Posts/>
       </div>
    );
}

function DashboardBody(props)
{
    if (props.DashboardType==='student')
    {
        return (
            <>
                <StudentBody/>
            </>
        );
    }
}


export default DashboardBody;