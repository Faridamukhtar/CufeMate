import React, { useState, useEffect } from "react";
import './login_signup.css';
import { Link , useNavigate} from 'react-router-dom';

const LoginSignup = () => {
  const navigate = useNavigate(); // Initialize the navigate hook
  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/majors'); 
        const majorsData = await response.json();
        console.log(majorsData);
        const options = majorsData.map((major) => (
        <option value={major.major_id}>{major.major_name}</option>));
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
  const handleLogin = async (email, password) => {
    try {
      // Construct the URL with actual values for email and password
      const url = `http://localhost:8080/api/login/student/${encodeURIComponent(email)}/${encodeURIComponent(password)}`;
  
      // Make a GET request to the constructed URL
          const response = await fetch(url); 
          const result = await response.json();
          // Handle the login result as needed
          console.log(result.user);
          console.log("Login clicked");
          if(result.message ==='Invalid username or password')
          {
              alert("Invalid username or password");
              return;
          }
          if(response.ok && result.user.rep_flag === 1)
          {
            console.log("ana rep w raye7 dashboard",result.user);
            navigate(`/rep/${result.user.std_id}/${result.user.major_id}/${result.user.fname}/${result.user.lname}/${result.user.class}`);
            return;
          }
          else if(response.ok)
          {
            console.log("ana fl login_signup w ana student",result.user);
             navigate(`/student/${result.user.std_id}/${result.user.major_id}/${result.user.fname}/${result.user.lname}/${result.user.class}`);
             return;
          }
        } 
        catch (error) {
          console.error('Error during login:', error);
          alert("error during login");
        }
        console.log("Login clicked");
  };

  const handleSignup = async (std_id, fname, lname, email, major_id, password, studentClass) => {
    try {
      /*const isValidid = /^\d+$/.test(std_id);
      const isValidfname = /^\d+$/.test(fname);
      const isValidlname = /^\d+$/.test(lname);
      const isValidmail = /^\d+$/.test(email);
      const isValidpass = /^\d+$/.test(password);
      if(!isValidid || !isValidfname || !isValidlname || !isValidmail  || !isValidpass)
      {
        alert("enter all data");
        return;
      }*/
      const url = 'http://localhost:8080/api/signup/student';
      const data = {
        Fname: fname,
        Lname: lname,
        Std_ID: std_id,
        Email: email,
        Passw: password,
        Major_ID: major_id,
        studentC: studentClass,
      };
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if(result.message ==='user already exists')
          {
              alert("user already exists, try logging in");
          }
      if (!response.ok) {
        // Handle non-successful response
        const errorResponse = await response.json();
        console.error('Error during signup:', errorResponse);
        // You might want to show a user-friendly error message here
        alert("error during signup");
        return;
      }
      // Handle the signup result as needed
      console.log(result);
      if(result.message ==='Internal Server Error')
          {
              alert("some data may be missing or of incorrect format");
          }
      if (result.message==='Signup successful')
      {
        alert("Signup Successful");
      }
    } catch (error) {
      console.error('Error during signup:', error);
      // Handle unexpected client-side errors
      // You might want to show a user-friendly error message here
      alert("some data may be missing or of incorrect format");
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
            <button >Student</button>
            <Link to='/Club'>
            <button >Student Club</button>
            </Link>
            <Link to='/Admin'>
            <button >Admin</button>
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
          <Link to='/ForgotPass'>
            <button>Forgot Password</button>
          </Link>
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
          <option value="2028">Class 2028</option>
          <option value="2027">Class 2027</option>
          <option value="2026">Class 2026</option>
          <option value="2025">Class 2025</option>
          <option value="2024">Class 2024</option>
          {/*Classes to be updated annually*/}
        </select>
        <button onClick={() => handleSignup(signupStudentId, signupFirstName, signupLastName, signupEmail,  signupMajor, signupPassword,signupClass)}>Signup</button>
      </div>
      </div>
      </div>
    </div>
  );
};

export default LoginSignup;


