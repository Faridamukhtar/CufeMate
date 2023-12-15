import React, { useState , useEffect ,useRef  } from 'react';
import ChooseHeader from "./Header.js";
import './SettingsBoard.css';
import TextInput from './TextInput';


const UpdatePassword = ({ message }) => {
  const [Cpass, setCpass] = useState('');
  const [Npass, setNpass] = useState('');
  const [conpass, setconpass] = useState('');
  const [currentPassFromApi, setCurrentPassFromApi] = useState('');

  useEffect(() => {
    const fetchPass = async (email) => {
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

        let url = `http://localhost:8080/api/${path}/?email=${email}`;
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
    let email 
    if (message==='student')
    {
       email = 'marmar@gmail.com'; // Replace with your dynamic email logic

    }
    else if (message==='studentclub')
    {
       email ='yarabb@hhh.gov'
    }
    else if (message==='admin')
    {
       email ='amira@handasa.com'
    }

    fetchPass(email);
  }, []); // Include message in the dependency array


  const handlePasswordUpdate = async (email, newPassword) => {

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
      const url = `http://localhost:8080/api/${path}/?email=${email}&password=${newPassword}`;
      const response = await fetch(url);
      const result = await response.json();
      console.log(result)
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
                  let email
                  if (message==='student')
                {
                  email = 'marmar@gmail.com'; // Replace with your dynamic email logic

                }
                else if (message==='studentclub')
                {
                  email ='yarabb@hhh.gov'
                }
                else if (message==='admin')
                {
                   email ='amira@handasa.com'
                }
            

      handlePasswordUpdate(email, Npass);
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

const UpdateInfo =() => 
{
  const [inputValue, setInputValue] = useState('');

  const [file, setFile] = useState(null);
  const [logo, setLogo] = useState(null);

  const handleFileChange = (e) => {
      setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('logo', file);

      const response = await fetch('/upload-logo', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setLogo(data.url);
  }; 


  

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAboutUpdate = async (email, inputValue) => {

      try {
        const url = `http://localhost:8080/api/UpdateAbout/${email}/${encodeURIComponent(inputValue)}`;
        const response = await fetch(url);
        const result = await response.json();
        console.log(result)
      } catch (error) {
        console.error('Error during about update:', error);
      }
    };

  const handleClick1 = (event) => {
  };

  const ChangeAbout =() => 
  {
    ///TO BE REMOVED LATER ON WHEN EMAIL IS ACTUALLY SAVED
    let email ='yarabb@hhh.gov'
    handleAboutUpdate(email, inputValue);

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
     
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '50px' ,width:'95%' }}>
        <div>
          <button className="button-clicked" onClick={handleClick1}>
            <span className="label-clicked">Update new image</span>
          </button>
          


          <button className="button-clicked" onClick={handleClick1}>
            <span className="label-clicked">+</span>
          </button>

          <div  >
            <form onSubmit={handleSubmit}>
              <input  className="button-clicked" type="file" onChange={handleFileChange} />
            </form>
            {logo && <img src={logo} alt="Logo" />}
          </div>
          

        </div>

        <div>
          <button className="button-clicked" onClick={ChangeAbout}>
            <span className="label-clicked">Update About</span>
          </button>
        </div>
</div>



     </div>
       


  )
}

function StudentBody(props)
{
   
    // Content to render based on the selected button
    const renderContent = () => 
    {
       return (
        <UpdatePassword message='student' />
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
                <UpdatePassword message='studentclub'/>
            );

        case 'Button2':
            return (
                <UpdateInfo/>
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
                <StudentBody DashboardType={props.DashboardType}/>
            </>
        );
    }
    else if (props.DashboardType==='studentclubsettings')
    {
        return (
            <>
                <Studentclubbody DashboardType={props.DashboardType}/>
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
                <ChooseHeader DashboardType={props.DashboardType}/>
            </div>
            <div className="DashboardBody">
               <Body DashboardType={props.DashboardType}/>
            </div>
        </div>
    );
}

export default SettingsBoard;