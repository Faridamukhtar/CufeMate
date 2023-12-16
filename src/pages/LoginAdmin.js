import React, { useState } from "react";
import './LoginAdmin.css';
import { Link , useNavigate} from 'react-router-dom';

const LoginAdmin = () => {
  const navigate = useNavigate(); // Initialize the navigate hook
    // State for login form
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
  
    const handleLogin = async (email, password) => {
      try {
        // Construct the URL with actual values for email and password
        const url = `http://localhost:8080/api/login/admin/${encodeURIComponent(email)}/${encodeURIComponent(password)}`;
    
        // Make a GET request to the constructed URL
            const response = await fetch(url); 
            const result = await response.json();
            // Handle the login result as needed
            console.log(result);
            console.log("Login clicked");
          if(response.ok)
          {
            console.log(result.user.admin_id);
            navigate(`/AdminDashboard/${result.user.admin_id}`);
          }
          if(result.message ==='Invalid username or password')
          {
            alert("Invalid username or password");
          }
          } 
          catch (error) {
            console.error('Error during login:', error);
          }
    };
  
    
    return (
      <div className="login_signup">
          <div className="welcome">
          Hi Handasa!<br/>
          Welcome to CufeMate Admin Window
          </div>
          <div className="components">
          <div className="left">
            <div className="switch_buttons">
            <Link to='/'>
              <button>Student</button>
              </Link>
              <Link to='/Club'>
              <button>Student Club</button>
              </Link>
              <button>Admin</button>
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
        </div>
        </div>
    );
  };
  
  export default LoginAdmin;
  
  
  