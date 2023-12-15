import React from 'react';
import './App.css';
import ComplaintDashboard from './pages/ComplaintDashboard.js'
import StudentDashboard from './pages/StudentDashboard.js'
import RepDashboard from './pages/RepDashboard.js';
import LoginSignup from './pages/login_signup.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentSetting from './pages/StudentSettings.js';
import LoginAdmin from './pages/LoginAdmin.js';
import LoginSignupClub from './pages/LoginSignupClub.js';



function App() {
  return (
    <>
      <div className='App'>

        <StudentSetting DashboardType="studentclubsettings" />
        <Router>
          <Routes>
            <Route path="/student" element={<StudentDashboard DashboardType='student' />} />
            <Route path="/rep" element={<RepDashboard DashboardType='studentRep'/>} />
            <Route path="/Settings" element={<StudentSetting />} />
            <Route path="/student/studentclubs" element={<StudentDashboard DashboardType='viewstudentclubs' />} />
            <Route path="/rep/studentclubs" element={<RepDashboard DashboardType='viewstudentclubs' />} />
            <Route path="/student/complaint" element={<ComplaintDashboard DashboardType='complaint'/>} />
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
