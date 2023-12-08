import React from "react";
import './Header.css';

function StudentHeader()
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
        <div>
            <div className="StudentHeader">
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


function ChooseHeader(props)
{
    if (props.DashboardType==='student')
    {
        return (
            <>
                <StudentHeader/>
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
}

export default ChooseHeader;