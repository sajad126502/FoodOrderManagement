import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../helpers/auth';

const UserDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //both admin and user can access the userdashboard
    if (isAuthenticated() && isAuthenticated().role === 1) {
      //For admin
      navigate('/user/dashboard');
    }
    else if (isAuthenticated() && isAuthenticated().role === 0) {
      //For user
      navigate('/user/dashboard');
      navigate('/shop');
    }
    else {
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <div>UserDashboard</div>
  )
}

export default UserDashboard