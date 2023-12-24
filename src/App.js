import React from 'react';
import './App.css';


import RepsContactsDashboard from './pages/RepsContactsDashboard.js'
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
import RepsComplaintsDashboard from './pages/RepsComplaintsDashboard.js';
import WritePostDashboard from './pages/WritePostDashboard.js';
import ReqToWritePostDashboard from './pages/ReqToWritePostDashboard.js';
import ViewPostReqDashboard from './pages/ViewPostReqDashboard.js';
import AdminStats from './pages/AdminStats.js';
import StudentClubForms from './pages/StudentClubForms.js';
import ForgotPass from './Components/ForgotPass.js';


function App() {

  return (
    <>
      <div className='App'>
      <Router>
          <Routes>

            <Route path="/" element={<LoginSignup/>} />
            <Route path="/Club" element={<LoginSignupClub />} />
            <Route path="/Admin" element={<LoginAdmin />} />
            <Route path="/ForgotPass" element={<ForgotPass/>}/>

            <Route path="/student/:student" element={<StudentDashboard DashboardType='student' />} />
            <Route path="/StudentClubStatistics/:club" element={<StudentClubStats/>} />
            
            <Route path="/complaints" element={<ComplaintDashboard/>} />
            <Route path="/rep" element={<RepDashboard DashboardType='studentRep'/>} />
            <Route path="/StudentSettings" element={<StudentSetting DashboardType='studentsettings' />} />
            <Route path="/StudentClubSettings" element={<StudentSetting DashboardType='studentclubsettings' />} />
            <Route path="/student/studentclubs" element={<StudentDashboard DashboardType='viewstudentclubs' />} />
            <Route path="/rep/studentclubs" element={<RepDashboard DashboardType='viewstudentclubs' />} />

            <Route path="/reps_contacts" element={<RepsContactsDashboard/>} />

            <Route path="/AdminDashboard/:admin_id" element={<AdminDashboard />} />
            <Route path="/Admin/add/:admin_id" element={<AddAdmin />} />
            <Route path="/Admin/requests/:admin_id" element={<AdminRequests/>} />
            <Route path="/Admin/stats/:admin_id" element={<AdminStats />} />
            <Route path="/AdminsSettings/:admin_id" element={<StudentSetting DashboardType='adminsettings' />} />

            <Route path="/repsviewcomplaints" element ={<RepsComplaintsDashboard />} />
            <Route path="/writepost" element ={<WritePostDashboard/>} />
            <Route path="/reqwritepost" element={<ReqToWritePostDashboard/>}/>
            <Route path="/viewpostreq" element={<ViewPostReqDashboard/>}/>
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
