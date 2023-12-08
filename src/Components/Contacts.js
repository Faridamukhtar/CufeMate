import React, {} from "react";
import "./Contacts.css";


function Contact(props)
{
    return (
        <div className ="Container">
            <div className ="Name">
            </div>
            <div className ="Email">
            </div>
        </div>
    );
}


function Contacts(props)
{
    return (
        <div>
            <Contact/>
        </div>

    );
}


export default Contacts;