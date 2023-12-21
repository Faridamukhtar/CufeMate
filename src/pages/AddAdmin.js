import React, { useState} from "react";
import AdminBar from "../Components/adminBar.js";
import { useParams } from 'react-router-dom';

const AddAdmin = () => {
    const { admin_id } = useParams();//pass AdminID to the component
    const [AdminID, setAdminID] = useState('');
    const [Fname, setFname] = useState('');
    const [email, setEmail] = useState('');
    const [passw, setPassw] = useState('');
    const [Lname, setLname] = useState('');

    const handleSignup = async () => {

        try {
            const url = 'http://localhost:8080/api/add/admin';
            const data = {
            admin_id: AdminID,
            fname: Fname,
            lname: Lname,
            email: email,
            passw: passw,
          };
         
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          console.log('Response:', response);
    
          const result = await response.json();
          if(result.message ==='admin already exists')
              {
                  alert("admin already exists");
              }
          if(result.message ==='Internal Server Error')
              {
                  alert("some data may be missing or of incorrect format");
              }
          if (response.ok) {
            console.log('adding admin successful:', result);
          } else {
            console.error('adding admin failed:', result.message);
          }
        } catch (error) {
          console.error('Error during adding admin:', error);
        }
      };
    return (
          <div className="Layout">
          <AdminBar props={admin_id}/>
            <div className="Dashboard">
            <div className="MainTitle">Add Admin Form</div> 
            <input
            type="text"
            placeholder="Admin ID"
            value={AdminID}
            onChange={(e) => setAdminID(e.target.value)}
          />
          <input
            type="text"
            placeholder="Admin First Name"
            value={Fname}
            onChange={(e) => setFname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Admin Last Name"
            value={Lname}
            onChange={(e) => setLname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={passw}
            onChange={(e) => setPassw(e.target.value)}
          />
          <button onClick={handleSignup}>Signup</button>
        </div>
        </div>
    );
};

export default AddAdmin;
