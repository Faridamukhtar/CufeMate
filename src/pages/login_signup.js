import React, { useState, useEffect } from "react";
import './login_signup.css';

const LoginSignup = () => {

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await fetch('/api/majors'); 
        const majorsData = await response.json();

        const options = majorsData.map((major) => (
          <option value={major.major_id}>{major.major_name}</option>
        ));

        setMajorOptions(options);
      } catch (error) {
        console.error('Error fetching majors:', error);
      }
    };
    fetchMajors();

  }, []);

  // State for login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // State for signup form
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupStudentId, setSignupStudentId] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupMajor, setSignupMajor] = useState('');
  const [signupClass, setSignupClass] = useState('');

  const [majorOptions, setMajorOptions] = useState([]);

  const handleLogin = async () => {
    //calling the get fn in login route
        try {
          // Make a GET request to login API endpoint
          const response = await fetch('/api/login/student'); 
          const result = await response.json();
          // Handle the login result as needed
          console.log(result);
        } 
        catch (error) {
          console.error('Error during login:', error);
        }
        console.log("Login clicked");
  };

  const handleSignup = async () => {
    //calling the get fn in signup route
    try {
        // Make a GET request to login API endpoint
        const response = await fetch('/api/signup/student'); 
        const result = await response.json();
        // Handle the login result as needed
        console.log(result);
      } 
      catch (error) {
        console.error('Error during login:', error);
      }
    console.log("Signup clicked");
  };

  return (
    <div className="login_signup">
        <div className="welcome">
        Hi Handasa!<br/>
        Welcome to CufeMate Student Window
        </div>
        <div className="components">
        <div className="left">
          <div className="switch_buttons">
            <button>Student</button>
            <button>Student Club</button>
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
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
      <div className="right">
      <div className="signup">
        <input
          type="text"
          placeholder="First Name"
          value={signupFirstName}
          onChange={(e) => setSignupFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={signupLastName}
          onChange={(e) => setSignupLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Student ID"
          value={signupStudentId}
          onChange={(e) => setSignupStudentId(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={signupEmail}
          onChange={(e) => setSignupEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
        />
        <select
          value={signupMajor}
          onChange={(e) => setSignupMajor(e.target.value)}
        >
          <option value="" disabled>Select Major</option>
          {majorOptions}
        </select>
        <select
          value={signupClass}
          onChange={(e) => setSignupClass(e.target.value)}
        >
          <option value="" disabled>Select Class</option>
          <option value="Class 2028">2028</option>
          <option value="Class 2027">2027</option>
          <option value="Class 2026">2026</option>
          <option value="Class 2025">2025</option>
          <option value="Class 2024">2024</option>
          {/*Classes to be updated annually*/}
        </select>
        <button onClick={handleSignup}>Signup</button>
      </div>
      </div>
      </div>
    </div>
  );
};

export default LoginSignup;


