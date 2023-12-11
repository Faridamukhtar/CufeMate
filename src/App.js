import React from 'react';
import './App.css';

import LoginSignup from './pages/login_signup.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentDashboard from './pages/StudentDashboard.js';
import StudentSetting from './pages/StudentSettings.js';


function App() {
  return (
    <>
      <div className='App'>
        <LoginSignup />
        <Router>
          <Routes>
            <Route path="/" element={<StudentDashboard />} />
            <Route path="/Settings" element={<StudentSetting />} />
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
