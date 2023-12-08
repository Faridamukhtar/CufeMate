import React from 'react';
import './App.css';
import StudentDashboard from './pages/StudentDashboard.js'
import LoginSignup from './pages/login_signup.js'

function App() {
  return (
    <>
      <div className='App'>
        <LoginSignup />
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
