import React from 'react'
import Cookies from 'js-cookie'
import { Outlet } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { UseSetUser } from './UserContext';
import { useEffect } from 'react';
import { useFetch } from './Fetch'


const CheckAuth = ({ children }) => {
  const setUser = UseSetUser();
  const accessToken = Cookies.get('Authorization')
  const CustomFetch = useFetch()

  useEffect(() => {
    (async () => {
      if (accessToken) { 
        let token = accessToken.match(/^s:(.*)\..*$/)[1]
        let { id: userId } = jwt_decode(token)
  
        const { data: { data: { id, username, profilePicture, role } }} = await CustomFetch({ 
          url: `user/${userId}`,
          options: {
            method: 'GET',
          }
        }) 
        
        setUser({ id, username, profilePicture, role, isAuthenticated: true })
      }
      else {
        setUser({ id: '', username: '', isAuthenticated: false })
      }
    })()
  }, []);
    

  return (
    <>
        {children}
        <Outlet />
    </>
  )
}

export default CheckAuth