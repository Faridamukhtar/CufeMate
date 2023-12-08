import React from 'react';
import './App.css';
import ComplaintDashboard from './pages/ComplaintDashboard.js'


function App() {
  return (
    <>
      <div className='App'>
        <ComplaintDashboard/>
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
