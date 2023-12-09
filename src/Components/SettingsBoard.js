import React, { useState } from 'react';
import ChooseHeader from "./Header.js";
import './SettingsBoard.css';
import TextInput from './TextInput';



const UpdatePassword =() => {
    const [Cpass, setCpass] = useState('');
    const [Npass, setNpass] = useState('');
    const [conpass, setconpass] = useState('');

    

    //To BE DONE BACKEND (UPDATE PASSWORD)
    const handleClick = () => {
        if (Npass !== conpass) {
          alert("New password and confirm password don't match.");
           return;
         }
        // If current pass equal el pass f3lan 
        // Get current pass mn el api
        // update pass api 
 
    };


    return (
            <div>
                <TextInput Title= "Current Password" placeholderText="Current Password" isPassword={true} setInputValue={setCpass} inputValue={Cpass}/>
                <TextInput Title= "New Password" placeholderText="New Password" isPassword={true} setInputValue={setNpass} inputValue={Npass} />
                <TextInput Title= "Confirm Password" placeholderText="Confirm Password" isPassword={true} setInputValue={setconpass} inputValue={conpass} />
                <button className="button-clicked" onClick={handleClick}>
                <span className="label-clicked ">Update password</span>
                </button>
            </div>
        );
}



//Student Settings 
function StudentBody(props)
{
    //To determine which button is selected so which components will I render
    const [selectedButton, setSelectedButton] = useState('Button1');
   
    const handleButtonClick = (button) => {
        setSelectedButton(button);
      };

    // Content to render based on the selected button
    const renderContent = () => 
    {
        switch (selectedButton) {
        case 'Button1':
            return (
                <UpdatePassword/>
            );

        case 'Button2':
            //Return back to sign up page
            return <div>Your account has been deleted</div>;

        default:
            return null;
        }
    };
      
    return (
        <div className="Wrapper">
            <div className="Title">
                <h3>
                    Account Settings
                </h3>
            </div>

            {/* Button one (change pass) */}
            <button
            className={selectedButton === 'Button1' ? 'button-clicked' : 'button'}
            onClick={() => handleButtonClick('Button1')}
             >
            <span className={selectedButton === 'Button1' ? 'label-clicked' : 'label'}>Password</span>
            </button>

            {/* Button two (Delete acc)*/}
            <button
            className={selectedButton === 'Button2' ? 'button-clicked' : 'button'}
            onClick={() => handleButtonClick('Button2')}
             >
            <span className={selectedButton === 'Button2' ? 'label-clicked' : 'label'}>Delete Account</span>
            </button>
    
            {/* Border line*/}
            <hr className="BorderLine"/>

            
            {renderContent()}

        </div>
    );
}

function Body(props)
{
    if (props.DashboardType==='studentsettings')
    {
        return (
            <>
                <StudentBody DashboardType={props.DashboardType}/>
            </>
        );
    }


}

function SettingsBoard(props)
{
    return (
        <div className="SettingsWrapper">
            <div className="DashboardHeader">
                <ChooseHeader DashboardType={props.DashboardType}/>
            </div>
            <div className="DashboardBody">
               <Body DashboardType={props.DashboardType}/>
            </div>
        </div>
    );
}

export default SettingsBoard;