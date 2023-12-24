import React, { useState } from 'react';
import './ForgotPass.css';
import { Link } from 'react-router-dom';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [table, setTable] = useState('');

  const handleChangePassword = async () => {
    // Check if the two passwords match
    if (newPassword !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      
      try {
        // Check if email exists
        const emailCheckResponse = await fetch(`http://localhost:8080/api/forgotPass/emailCheck/${table}/${email}`);
        const emailCheckData = await emailCheckResponse.json();
  
        if (!emailCheckData.success) {
          alert('Email not found! Check Email or User Type');
          return;
        }
  
        // Change the password
        const updatePassResponse = await fetch(`http://localhost:8080/api/forgotPass/updatePass/${table}/${email}/${newPassword}`, {
          method: 'PUT',
        });
  
        const updatePassData = await updatePassResponse.json();
  
        if (updatePassData.success) {
          alert('Password updated successfully!');
        } else {
          alert('Failed to update password. Please try again.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred. Please try again.');
      }
    };


  const handleUserTypeChange = (e) => {
    setTable(e.target.value);
  };
    return (
      <div className='ForgotPass'>
        <div className='welcome'>Change Password</div>
        <div className='selection'>
          <select value={table} onChange={handleUserTypeChange}>
            <option value="" disabled>User Type</option>
            <option value="admins">Admin</option>
            <option value="student">Student</option>
            <option value="student_club">Club</option>
          </select>
        </div>
        <div className='selection'>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='selection'>
          <input 
            placeholder="New Password"
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
          />
        </div>
        <div className='selection'>
          <input
            placeholder="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className='forgotbuttons'>
        <button onClick={handleChangePassword}>Change Password</button>
        <Link to="/" >
        <button>Back</button>
        </Link>
        </div>
        </div>
    );
};

export default ForgotPass;
