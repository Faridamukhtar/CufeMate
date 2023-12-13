import React from 'react';
import './App.css';
import StudentDashboard from './pages/StudentDashboard.js'
import RepDashboard from './pages/RepDashboard.js';
import LoginSignup from './pages/login_signup.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentSetting from './pages/StudentSettings.js';
import LoginAdmin from './pages/LoginAdmin.js';
import LoginSignupClub from './pages/LoginSignupClub.js';
//import AdminBar from './Components/adminBar.js';


function App() {
  return (
    <>
      <div className='App'>
        <Router>
          <Routes>
            <Route path="/Home" element={<StudentDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/rep" element={<RepDashboard />} />
            <Route path="/Settings" element={<StudentSetting />} />
            <Route path="/" element={<LoginSignup />} />
            <Route path="/Club" element={<LoginSignupClub />} />
            <Route path="/Admin" element={<LoginAdmin />} />
          </Routes>
        </Router>
      </div>
      <div className='Mobile'>
       <h2>
          Mobile Version Under Development. Please Use a Laptop/PC.
       </h2>
      </div>
    </>
  );
}

export default App;
