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
import StudentClubStats from "./pages/StudentClubStats.js"
import AdminDashboard from './pages/AdminDashboard.js';
import AddAdmin from './pages/AddAdmin.js';
import AdminRequests from './pages/AdminRequests.js';
import StudentClubForms from './pages/StudentClubForms.js';
//import AdminBar from './Components/adminBar.js';





function App() {

  return (
    <>
      <div className='App'>

        <Router>
          <Routes>
            <Route path="/student" element={<StudentDashboard DashboardType='student' />} />
            <Route path="/complaints" element={<ComplaintDashboard/>} />
            <Route path="/StudentClubStatistics" element={<StudentClubStats/>} />
            <Route path="/rep" element={<RepDashboard DashboardType='studentRep'/>} />
            <Route path="/StudentSettings" element={<StudentSetting DashboardType='studentsettings' />} />
            <Route path="/StudentClubSettings" element={<StudentSetting DashboardType='studentclubsettings' />} />
            <Route path="/AdminsSettings" element={<StudentSetting DashboardType='adminsettings' />} />

            <Route path="/student/studentclubs" element={<StudentDashboard DashboardType='viewstudentclubs' />} />
            <Route path="/rep/studentclubs" element={<RepDashboard DashboardType='viewstudentclubs' />} />
            <Route path="/" element={<LoginSignup />} />
            <Route path="/Club" element={<LoginSignupClub />} />
            <Route path="/Admin" element={<LoginAdmin />} />
            <Route path="/AdminDashboard/:admin_id" element={<AdminDashboard />} />
            <Route path="/Admin/add" element={<AddAdmin />} />
            <Route path="/Admin/requests/:admin_id" element={<AdminRequests/>} />
            <Route path="/StudentClub/Forms" element={<StudentClubForms DashboardType='StudentClubForms'/>} />
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
