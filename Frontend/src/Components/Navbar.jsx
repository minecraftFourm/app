import React, { Suspense } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import { UseSetUser, UseUser } from "../Contexts/UserContext";

const Navbar = () => {
  const Navigate = useNavigate();
  const user = UseUser()
  const setUser = UseSetUser();
  const activeStyle = {
    fontWeight: "500",
    color: "#6366f1"
  }

  const handleLogout = async () => {
    // TODO: convert to using custom fetch, and handle errors
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    })
    if (response.ok) {
      setUser({ isAuthenticated: false, username: '', id: '', isLoading: false })
      Navigate('login') // Navigate to login page
    }
  }
  
  return (
    <>    
      <div className="grid h-16 bg-white drop-shadow-lg w-full" id="header">
        <div className="flex justify-between px-4 items-center w-full">
          <div>
            <Link to={"/"} className="text-2xl font-bold cursor-pointer">Servername</Link>
          </div>
          <div className="md:hidden">
            <ul className="flex justify-between">
              <li className="mr-4 text-xl hover:text-indigo-300 cursor-pointer">
                <NavLink to="/" style={({isActive}) => isActive ? activeStyle : undefined }>
                  Home
                </NavLink>
              </li>
              <li className="mr-4 text-xl cursor-pointer hover:text-indigo-300 duration-300">
                <NavLink to="forum" style={({isActive}) => isActive ? activeStyle : undefined }>
                  Forum
                </NavLink>
              </li>
              <li className="mr-4 text-xl cursor-pointer hover:text-indigo-300 duration-300">
                <NavLink to="rules" style={({isActive}) => isActive ? activeStyle : undefined }>
                  Rules
                </NavLink>
              </li>
              <li className="mr-4 text-xl cursor-pointer hover:text-indigo-300 duration-300">
                <NavLink to="games" style={({isActive}) => isActive ? activeStyle : undefined }>
                  Games
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="md:hidden">
            {user.isAuthenticated ? (
              <div className="flex flex-row items-center gap-2">
                <img src={user.profilePicture} className="w-[48px] h-[48px] object-cover object-center rounded-full " alt="" />
                <button className="mr-4 text-sm font-medium" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div className="flex flex-row gap-2 items-center">
                <NavLink to={"./login"} className="mr-4 text-lg font-medium hover:text-indigo-300 duration-300">Login</NavLink>
                <NavLink to={"./register"} className="py-1 px-4 bg-indigo-500 rounded-md font-medium text-white hover:bg-indigo-700 duration-300">
                  Register
                </NavLink>
              </div>
            )}
          </div>
           {/* Mobile Menu */}
           <div className="hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </div>
        </div>
      </div>

      {/* TODO: Change to a proper loading screen  */}
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Navbar;
