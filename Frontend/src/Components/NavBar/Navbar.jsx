import React from "react";
import { Link } from "react-router-dom";
const Navbar = ({ isLogin }) => {
  return (
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
          {isLogin ? (
            <button className="mr-4 text-lg font-medium">Logout</button>
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
  );
};

export default Navbar;
