import React from 'react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { UseUser } from './UserContext'

const RedirectAuth = () => {
    const Navigate = useNavigate();
    const User = UseUser()

    useEffect(() => {
      if (User.isAuthenticated) {
        Navigate('./')
      }
    });

  return (
    <>
        <Outlet/>
    </>
  )
}

export default RedirectAuth