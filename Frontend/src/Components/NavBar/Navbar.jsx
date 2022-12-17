import React, { Suspense } from "react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import { UseSetUser, UseUser } from "../../Contexts/UserContext";

const Navbar = () => {
  const user = UseUser()
  const setUser = UseSetUser();

  const handleLogout = async () => {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    })
    if (response.ok) {
      setUser({ isAuthenticated: false, username: '', id: '' })
    }
  }
  return (
    <>    
      <div className="grid h-16 bg-white drop-shadow-lg w-full">
        <div className="flex justify-around items-center">
          <div>
            <h1 className="text-2xl font-bold cursor-pointer">Servername</h1>
          </div>
          <div>
            <ul className="flex justify-between">
              <li className="mr-4 text-xl font-medium text-indigo-500 cursor-pointer">
                <Link to="/">
                  Home                
                </Link>
              </li>
              <li className="mr-4 text-xl cursor-pointer hover:text-indigo-500 duration-300">
                <Link to="forum">
                  Forum
                </Link>
              </li>
              <li className="mr-4 text-xl cursor-pointer hover:text-indigo-500 duration-300">
                <Link to="teams">
                  Teams
                </Link>
              </li>
              <li className="mr-4 text-xl cursor-pointer hover:text-indigo-500 duration-300">
                <Link to="rules">
                  Rules
                </Link>
              </li>
              <li className="mr-4 text-xl cursor-pointer hover:text-indigo-500 duration-300">
                <Link to="games">
                  Games
                </Link>
              </li>
            </ul>
          </div>
          <div>
            {user.isAuthenticated ? (
              <button className="mr-4 text-sm font-medium" onClick={handleLogout}>Logout</button>
            ) : (
              <div className="flex flex-row gap-2 items-center">
                <Link to={"./login"} className="mr-4 text-lg font-medium hover:text-indigo-500 duration-300">Login</Link>
                <Link to={"./register"} className="py-1 px-4 bg-indigo-500 rounded-md font-medium text-white hover:bg-indigo-700 duration-300">
                  Register
                </Link>
              </div>
            )}

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
