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
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    })
    if (response.ok) {
      setUser({ isAuthenticated: false, username: '', id: '' })
      Navigate('login') // Navigate to login page
    }
  }
  
  return (
    <>    
      <div className="grid h-16 bg-white drop-shadow-lg w-full" id="header">
        <div className="flex justify-around items-center">
          <div>
            <Link to={"/"} className="text-2xl font-bold cursor-pointer">Servername</Link>
          </div>
          <div>
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
                <NavLink to="teams" style={({isActive}) => isActive ? activeStyle : undefined }>
                  Teams
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
          <div>
            {user.isAuthenticated ? (
              <div className="flex flex-row items-center gap-2">
                <img src="https://s3-alpha-sig.figma.com/img/2bf0/38b2/24b6fd21fbe783bc14937744f3e9a9cc?Expires=1672617600&Signature=NvublJObKVhmjMBxLObHUbRHEagUU~qUA3lyoSCgO1otPB~h5IFEU125~tAh~48DYX4LOdYFwTzVSBk724hreypVr1R1P6DOgDMpWQUiYswZ9g5V93slEbdE6aalP3d0AwrL-svT8xXmfI6EkDaEu6THoUUN3p8ZCeg5pLiR07CPvHxmU8KVONl-ssv-LqDEpXODba8-I3nHJIUf-1KTNZNvf~FuaKbTyAJzscPKeq6zypywTo-kpcoW0npW7r5y6SSsDEOzRa1-bbrzWny5lWVQMJbDbLxs65p0jJotsYBd9B70mo368I-4CjB7S9NPjFEMBYiciu7p~Sx21AwIIQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" className="w-[48px] h-[48px] object-cover object-center rounded-full " alt="" />
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
