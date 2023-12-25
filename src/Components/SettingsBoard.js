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
        let path
        if (message==='student')
        {
          path = 'GetPass' ;
        }
        else if (message==='studentclub')
        {
          path = 'GetStudentClubPass' ;
        }
        else if (message==='admin')
        {
          path = 'GetAdminsPass' ;
        }

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
    let id 
    if (message==='student')
    {
       id = Std_ID; 

    }
    else if (message==='studentclub')
    {
       id =Club_ID;
    }
    else if (message==='admin')
    {
       id =admin_id;
    }

    fetchPass(id);
  }, []); 


  const handlePasswordUpdate = async (id, newPassword) => {

  let path
        if (message==='student')
        {
          path = 'UpdatePassword' ;
        }
        else if (message==='studentclub')
        {
          path = 'UpdateStudentClubPassword' ;
        }
        else if (message==='admin')
        {
          path = 'UpdateAdminsPassword' ;
        }


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
                  let id
                  if (message==='student')
                {
                  id = Std_ID; // Replace with your dynamic email logic

                }
                else if (message==='studentclub')
                {
                  id =Club_ID;
                }
                else if (message==='admin')
                {
                   id =admin_id
                }
            

      handlePasswordUpdate(id, Npass);
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

////////////////////////////////////////////////MA7TAGA EL CLUB_ID//////////////////////////////////////////////
const UpdateInfo =({Club_ID}) => 
{
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Process the file or store it in state, for example:
      setSelectedImage(file);
    }
  };

  const handleImageUpload = () => {
    // Use the selectedImage state for further processing or upload to the server.
    try{
    if (selectedImage) {
      // Perform actions with the selected image, such as sending it to the server.
      console.log('Selected Image:', selectedImage);
      const fileURL = URL.createObjectURL(selectedImage);
      console.log('File URL:', fileURL);
      setSelectedImage(fileURL);
    } else {
      console.log('No image selected.');
    }}
    catch(error)
    {
      console.log('image already uploaded',error);
      alert("image already uploaded");
    };
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAboutUpdate = async (inputValue) => {

      try {
        console.log('data', inputValue)
        const url = `http://localhost:8080/api/UpdateAbout/${Club_ID}/${encodeURIComponent(inputValue)}`;
        const response = await fetch(url);
        const result = await response.json();
        console.log(result)
      } catch (error) {
        console.error('Error during about update:', error);
      }
    };


  const ChangeAbout =() => 
  {
    handleAboutUpdate(inputValue);
  }
  const handleUpdateimage = async (logo) => {

    try {
      const url = `http://localhost:8080/api/Updatelogo/${Club_ID}/${encodeURIComponent(logo)}`;
      console.log('logo url', logo);
      console.log('Fetch url', url);

      const response = await fetch(url);
      const result = await response.json();
      console.log(result)
    } catch (error) {
      console.error('Error during about update:', error);
    }
  };
  const ChangeLogo=()=>{
     handleUpdateimage(Club_ID, selectedImage);
     console.log('')
  }


  return (
     <div>
      <textarea
        value={inputValue}
        onChange={handleInputChange}
        placeholder='About'
        className='AboutText'
      />
      <p className='charmsg'> {inputValue.length} : 2000 Characters </p>
     
      <div style={{  justifyContent: 'space-between', alignItems: 'center'}}>
          <label > please click upload image before clicking update image <br/></label>
          <div style={{display:'flex' , justifyContent:'space-between' , marginTop:'2%'}}>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{width:'40%'}}
          />
          
          <button className="button-clicked" onClick={handleImageUpload}>
            <span className="label-clicked">Upload Image</span>
          </button>
          <button className="button-clicked" onClick={ChangeLogo}>
            <span className="label-clicked">Update image</span>
          </button>
          </div>
        </div>
          <button className="button-clicked" onClick={ChangeAbout}>
            <span className="label-clicked">Update About</span>
          </button>
          {selectedImage && (
      <div>
        <img src={selectedImage} alt="Uploaded Logo" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
    )}
        </div>
       


  )
}

const ApplyRep =({Std_ID}) => {
  const [CurrentstatFromApi, setCurrentstatFromApi] = useState('');
   //get if he applied before and what is the status if he did 
   useEffect(() => {
    const fetchPass = async () => {
      try {
      
        let url = `http://localhost:8080/api/get_rep_req_stat?std_id=${Std_ID}`;
        console.log(url)
        const response = await fetch(url);
        const data = await response.json();
        const stat = data.length > 0 ? data[0].stat : '';
        if (stat===0)
        {
          setCurrentstatFromApi('Pending')
        }
        else if (stat===1)
        {
          setCurrentstatFromApi("Approved!!")
      
        }
        else if (stat===2)
        {
          setCurrentstatFromApi("Rejected")
      
        }
        else{
          setCurrentstatFromApi("Haven't applied yet")
        }
        console.log(data)
      } catch (error) {
        console.error('Error fetching Request Rep stat:', error);
      }
    };
    /////////////////////////////////////TO BE REMOVED WHEN ACTUAL LINKING OCCUR//////////////////////
    fetchPass();
  }, []); 
  //send request to apply if he didn't 

  const handleClick = async () => {
      try {
      
        let url = `http://localhost:8080/api/Makenewrepreq?std_id=${Std_ID}`;
        const response = await fetch(url);
        const data = await response.json();
        setCurrentstatFromApi("Pending")
      } catch (error) {
        console.error('Error fetching Request Rep stat:', error);
      }
    };

 

 
  return (
    <div>
      <div>
      <p  style={{padding:"1%"}}> Current stats = {CurrentstatFromApi} </p> 
      </div>
      <button className="button-clicked" onClick={handleClick}>
      <span className="label-clicked">Submit application</span>
      </button>
    </div>
    )
}

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
                <UpdatePassword message='student' Std_ID={props.studentData.std_id}/>
            );

        case 'Button2':
            return (
                <ApplyRep Std_ID={props.studentData.std_id}/>
            );
        case 'Button3':
            return (
                <StudentSubject Std_ID={props.studentData.std_id}/>
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
            <span className={selectedButton === 'Button1' ? 'label-clicked' : 'label'}> Change Password</span>
            </button>

            {/* Button two (Apply rep)*/}
            <button
            className={selectedButton === 'Button2' ? 'button-clicked' : 'button'}
            onClick={() => handleButtonClick('Button2')}
             >
            <span className={selectedButton === 'Button2' ? 'label-clicked' : 'label'}>Apply to be rep</span>
            </button>

             {/* Button three (Update Subjects)*/}
             <button
            className={selectedButton === 'Button3' ? 'button-clicked' : 'button'}
            onClick={() => handleButtonClick('Button3')}
             >
            <span className={selectedButton === 'Button3' ? 'label-clicked' : 'label'}>Subjects taken </span>
            </button>
    
            {/* Border line*/}
            <hr className="BorderLine"/>

            
            {renderContent()}

        </div>
    );
}

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

//Student Settings 
function Studentclubbody(props)
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
                <UpdatePassword message='studentclub' Club_ID={props.SCData.std_club_id}/>
            );

        case 'Button2':
            return (
                <UpdateInfo SCData={props.SCData} Club_ID={props.SCData.std_club_id}/>
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
            <span className={selectedButton === 'Button1' ? 'label-clicked' : 'label'}> Change Password</span>
            </button>

            {/* Button two (Delete acc)*/}
            <button
            className={selectedButton === 'Button2' ? 'button-clicked' : 'button'}
            onClick={() => handleButtonClick('Button2')}
             >
            <span className={selectedButton === 'Button2' ? 'label-clicked' : 'label'}> Update profile</span>
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
                <StudentBody DashboardType={props.DashboardType} studentData={props.studentData} />
            </>
        );
    }
    else if (props.DashboardType==='studentclubsettings')
    {
        return (
            <>
                <Studentclubbody DashboardType={props.DashboardType} SCData={props.SCData}/>
            </>
        );
    }
    else if (props.DashboardType==='adminsettings')
    {
        return (
            <>
                <AdminBody DashboardType={props.DashboardType}/>
            </>
        );
    }

}

function SettingsBoard(props)
{
    return (
        <div className="SettingsWrapper">
            <div className="DashboardHeader">
                <ChooseHeader SCData={props.SCData} DashboardType={props.DashboardType}/>
            </div>
            <div className="DashboardBody">
               <Body DashboardType={props.DashboardType} SCData={props.SCData} studentData={props.studentData} />
            </div>
        </div>
    );
}

export default SettingsBoard;
