import React from 'react';
import { Link } from 'react-router-dom';
const AdminBar = () => {
  return (
    <div className="admin-bar">

      <Link to='/Admin/allUsers'>
       <button> All Users</button>
      </Link>

      <Link to='/Admin/stats'>
       <button>Statistics</button>
      </Link>
      
      <Link to='/Admin/add'>
      <button>Add Admin</button>
      </Link>
      <Link to='/Admin/requests'>
      <button>Requests</button>
      </Link>
      <Link to="/Admin/settings">
      <button>Settings</button>
      </Link>
      <Link to="/" >
      <button>Logout</button>
      </Link>
    </div>
  );
};

export default AdminBar;
