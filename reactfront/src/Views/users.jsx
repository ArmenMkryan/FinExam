import React from 'react';
import { Link } from 'react-router-dom';


export const Users = () => {
 
    return (
        <div>
          
          <h1>Users</h1>
          <Link to="/users/new"   >Add new</Link>
        </div>
    );
  }

