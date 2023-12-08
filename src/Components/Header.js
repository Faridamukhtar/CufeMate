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

function RepsContactsHeader(props)

{ 
    return (
        <div className="studentHeader">
            <div className= "greeting">
                 <h1>
                    Reps Contacts
                 </h1>
                 <h3>
                    Reps of class {props.year} , {props.major} major 
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
    if (props.Dashboardtype==='reps_contacts')
    {
        return (
            <>
              <RepsContactsHeader DashboardType={props.DashboardType}/>
            </>
        );
    }
}

export default ChooseHeader;