import React, { useState } from "react";
import './LoginSignupClub.css';
import { Link } from 'react-router-dom';

const LoginSignupClub = () => {
  
    // State for login form
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
  
    const [stdClubId, setStdClubId] = useState('');
  const [stdClubName, setStdClubName] = useState('');
  const [email, setEmail] = useState('');
  const [passw, setPassw] = useState('');
  const [about, setAbout] = useState('');
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
    if (selectedImage) {
      // Perform actions with the selected image, such as sending it to the server.
      console.log('Selected Image:', selectedImage);
      const fileURL = URL.createObjectURL(selectedImage);
      console.log('File URL:', fileURL);
      setSelectedImage(fileURL);
    } else {
      console.log('No image selected.');
    }
  };

  const handleSignup = async () => {

    try {
        const url = 'http://localhost:8080/api/signup/student_club';
        const data = {
        std_club_name: stdClubName,
        std_club_id: stdClubId,
        email: email,
        passw: passw,
        about: about,
        logo: selectedImage,
      };
     
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response:', response);

      const result = await response.json();
      if(result.message ==='user already exists')
          {
              alert("user already exists, try logging in");
          }
      if(result.message ==='Internal Server Error')
          {
              alert("some data may be missing or of incorrect format");
          }
      if (response.ok) {
        console.log('Signup successful:', result);
      } else {
        console.error('Signup failed:', result.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  
    const handleLogin = async (email, password) => {
      try {
        // Construct the URL with actual values for email and password
        const url = `http://localhost:8080/api/login/student_club/${encodeURIComponent(email)}/${encodeURIComponent(password)}`;
    
        // Make a GET request to the constructed URL
            const response = await fetch(url); 
            const result = await response.json();
            // Handle the login result as needed
            console.log(result);
            if(result.message ==='Invalid username or password')
          {
              alert("Invalid username or password");
          }
          } 
          catch (error) {
            console.error('Error during login:', error);
          }
          console.log("Login clicked");
    };
  
    return (
      <div className="login_signup">
          <div className="welcome">
          Hi Handasa!<br/>
          Welcome to CufeMate Student Club Window
          </div>
          <div className="components">
          <div className="left">
            <div className="switch_buttons">
              <Link to='/'>
              <button>Student</button>
              </Link>
              <button>Student Club</button>
              <Link to='/Admin'>
              <button>Admin</button>
              </Link>
            </div> 
            <div className="login">
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button onClick={() => handleLogin(loginEmail, loginPassword)}>Login</button>
            <button>Forgot Password</button>
          </div>
        </div>
        <div className="right">
        <div className="signup">
          <input
            type="text"
            placeholder="Club Name"
            value={stdClubName}
            onChange={(e) => setStdClubName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Club ID"
            value={stdClubId}
            onChange={(e) => setStdClubId(e.target.value)}
          />
          <input
            type="text"
            placeholder="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={passw}
            onChange={(e) => setPassw(e.target.value)}
          />
          <div className="inputPhoto">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {selectedImage && (
            <img src={selectedImage} alt="Selected" style={{ maxWidth: '20%' }} />
          )}
          </div>
          <label>please click upload before clicking signup <br/></label>
          <button onClick={handleImageUpload}>Upload Image</button>
          <button onClick={handleSignup}>Signup</button>
        </div>
        </div>
        </div>
      </div>
    );
  };
  
  export default LoginSignupClub;
  
