import React from 'react'
import Cookies from 'js-cookie'
import { Outlet } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { UseSetUser } from './UserContext';
import { useEffect } from 'react';

const CheckAuth = ({ children }) => {
  const setUser = UseSetUser();
  const accessToken = Cookies.get('Authorization')
  
  useEffect(() => {
    if (accessToken) { 
      let token = accessToken.match(/^s:(.*)\..*$/)[1]
      let { id, username, profilePicture, role } = jwt_decode(token)
      setUser({ id, username, profilePicture, role, isAuthenticated: true })
    }
    else {
      setUser({ id: '', username: '', isAuthenticated: false })
    }
    
  }, []);
    

  return (
    <>
        {children}
        <Outlet />
    </>
  )
}

export default CheckAuth