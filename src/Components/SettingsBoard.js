import React, { useState , useEffect  } from 'react';
import ChooseHeader from "./Header.js";
import './SettingsBoard.css';
import TextInput from './TextInput';

const UpdatePassword =() => {
    //CURRENT PASS , NEW AND CONFIRM PASS STATES + SAVING RETURNING FROM API
    const [Cpass, setCpass] = useState('');
    const [Npass, setNpass] = useState('');
    const [conpass, setconpass] = useState('');
    const [currentPassFromApi, setCurrentPassFromApi] = useState('');

    const FetchPass = async (email) => {
      try {
         // Construct the URL with actual values for email and newPassword
         const url = `http://localhost:8080/api/Getpass/?email=${email}`;
         console.log(url);
        //TO BE REMOVEDDDD
        // url = 'http://localhost:8080/api/Getpass?email=marmar@gmail.com';
       // console.log(url);

        //TO BE INSERTED
       const response = await fetch(url);
        const data = await response.json();
        const currentPass = data.length > 0 ? data[0].passw : '';
        setCurrentPassFromApi(currentPass);
      } catch (error) {
        console.error('Error fetching Password:', error);
      }
    };

    
//UPDATING PASSWORD:-
const handlePasswordUpdate = async (email, newPassword) => {
    try {
        
      // Construct the URL with actual values for email and newPassword
        const url = `http://localhost:8080/api/UpdatePassword/?email=${email}&password=${newPassword}`;
  
      // Make a GET request to the constructed URL
      const response = await fetch(url);
      const result = await response.json();
  
      // Handle the password update result as needed
      console.log(result);
    } catch (error) {
      console.error('Error during password update:', error);
    }
  };
  


    const handleClick = () => {

        FetchPass('marmar@gmail.com')
        if (Npass !== conpass) {
          alert("New password and confirm password don't match.");
           return;
         }

        // If current pass equal el pass f3lan 
        // Get current pass mn el api
        if (Cpass !== currentPassFromApi) {
            console.log("pass el api",currentPassFromApi);
            console.log("pass el written", Cpass)
            alert("Current password is incorrect.");
            return;
          }
        // update pass api 
        else 
        {
            //GET EMAIL BGD BA
            handlePasswordUpdate('marmar@gmail.com', Npass);
        }

 
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

function AccDelete () { 
    return (
        <div>
        Your account has been deleted
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
            return (
                <AccDelete/>
            );
        
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