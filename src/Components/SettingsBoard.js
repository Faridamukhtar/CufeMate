import React, { useState , useEffect  } from 'react';
import ChooseHeader from "./Header.js";
import './SettingsBoard.css';
import TextInput from './TextInput';

const UpdatePassword = () => {
  const [Cpass, setCpass] = useState('');
  const [Npass, setNpass] = useState('');
  const [conpass, setconpass] = useState('');
  const [currentPassFromApi, setCurrentPassFromApi] = useState('');

  useEffect(() => {
    const fetchPass = async (email) => {
      try {
        //TO BE REMOVEDDDD
        //const response = await fetch('http://localhost:8080/api/Getpass?email=marmar@gmail.com');
        let url =  `http://localhost:8080/api/Getpass/?email=${email}`;
        const response = await fetch(url);
        const data = await response.json();
        const currentPass = data.length > 0 ? data[0].passw : '';
        setCurrentPassFromApi(currentPass);
      } catch (error) {
        console.error('Error fetching Password:', error);
      }
    };
    //to be changed
    fetchPass('marmar@gmail.com')
  }, []); 

  const handlePasswordUpdate = async (email, newPassword) => {
    try {
      const url = `http://localhost:8080/api/UpdatePassword/?email=${email}&password=${newPassword}`;
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error during password update:', error);
    }
  };


  const handleClick = async () => {

    if (Npass !== conpass) {
      alert("New password and confirm password don't match.");
      return;
    }

    if (Cpass !== currentPassFromApi) {
      console.log("pass el api", currentPassFromApi);
      console.log("pass el written", Cpass);
      alert("Current password is incorrect.");
      return;
    } else {
      handlePasswordUpdate('marmar@gmail.com', Npass);
    }
  };

  return (
    <div>
      <TextInput
        Title="Current Password"
        placeholderText="Current Password"
        isPassword={true}
        setInputValue={setCpass}
        inputValue={Cpass}
      />
      <TextInput
        Title="New Password"
        placeholderText="New Password"
        isPassword={true}
        setInputValue={setNpass}
        inputValue={Npass}
      />
      <TextInput
        Title="Confirm Password"
        placeholderText="Confirm Password"
        isPassword={true}
        setInputValue={setconpass}
        inputValue={conpass}
      />
      <button className="button-clicked" onClick={handleClick}>
        <span className="label-clicked ">Update password</span>
      </button>
    </div>
  );
};


const handleAccountDeletion = async (email) => {
    try {
      const url = `http://localhost:8080/api/DeleteAcc/?email=${(email)}`;
      //console.log(url);
      //url = 'http://localhost:8080/api/DeleteAcc/?email=zft@gmail.com'
      //console.log(url);

      const response = await fetch(url, {
        method: 'DELETE'
      });
  
      const result = await response.json();
  
      if (result.success) {
        console.log("Account deletion successful");
      } else {
        console.log("Account deletion failed:", result.message);
      }
    } catch (error) {
      console.error('Error during account deletion:', error);
    }
    console.log("Account deletion clicked");
  };



function AccDelete () { 
    handleAccountDeletion('zft@gmail.com');
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