import React, { useState , useEffect ,useRef  } from 'react';
import ChooseHeader from "./Header.js";
import './SettingsBoard.css';
import TextInput from './TextInput';
import StudentSubject from "./StudentSubjects.js"
import { useParams } from 'react-router-dom';

const UpdatePassword = ({ message , Std_ID , Club_ID}) => {
  const { admin_id } = useParams();
  const [Cpass, setCpass] = useState('');
  const [Npass, setNpass] = useState('');
  const [conpass, setconpass] = useState('');
  const [currentPassFromApi, setCurrentPassFromApi] = useState('');
  
  useEffect(() => {
    const fetchPass = async (id) => {
      try {
        let path = 'GetAdminsPass' ;
        let url = `http://localhost:8080/api/${path}/?id=${id}`;
        const response = await fetch(url);
        console.log(url);
        const data = await response.json();
        const currentPass = data.length > 0 ? data[0].passw : '';
        setCurrentPassFromApi(currentPass);
      } catch (error) {
        console.error('Error fetching Password:', error);
      }
    };
    /////////////////////////////////////TO BE REMOVED WHEN ACTUAL LINKING OCCUR//////////////////////
    let id =admin_id;
    fetchPass(id);
  }, []); 


  const handlePasswordUpdate = async (id, newPassword) => {

  let path = 'UpdateAdminsPassword' ;
    try {
      const url = `http://localhost:8080/api/${path}/?id=${id}&password=${newPassword}`;
      const response = await fetch(url);
      const result = await response.json();
      console.log(result)
      alert("Password Updated");

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
                  let id =admin_id
                  handlePasswordUpdate(id, Npass);

        }          
    }

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




function AdminBody(props)
{
   
    // Content to render based on the selected button
    const renderContent = () => 
    {
       return (
        <UpdatePassword message='admin' />
        )
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
            className='button-clicked'
             >
            <span className='label-clicked'> Change Password</span>
            </button>
    
            {/* Border line*/}
            <hr className="BorderLine"/>

            
            {renderContent()}

        </div>
    );
}


function SettingsBoard(props)
{
    return (
        <div className="SettingsWrapper">
            <div className="DashboardHeader">
                <ChooseHeader  DashboardType={props.DashboardType}/>
            </div>
            <div className="DashboardBody">
            <AdminBody DashboardType={props.DashboardType}/>
            </div>
        </div>
    );
}

export default SettingsBoard;
