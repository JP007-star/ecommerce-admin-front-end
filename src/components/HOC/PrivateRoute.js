import React from 'react';
import {Navigate} from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const user=window.localStorage.getItem('token');
    if (user) {
        return children;
    }
    else{
        return <Navigate to="/signin" replace />;
    }
  
    
  };
export default PrivateRoute; 