import React from "react";
import { Link } from "react-router-dom";
const Navbar = ({ isLogin }) => {
  return (
    <div className="container grid h-16 bg-white">
      <div className="flex justify-around items-center">
        <div>
          <h1 className="text-2xl font-bold">Servername</h1>
        </div>
        <div>
          <ul className="flex justify-between">
            <li className="mr-4 text-xl text-blue cursor-pointer">
              <Link to="/">
                <a className="">Home</a>
              </Link>
            </li>
            <li className="mr-4 text-xl cursor-pointer">
              <Link to="forum">
                <a>Forum</a>
              </Link>
            </li>
            <li className="mr-4 text-xl cursor-pointer">
              <Link to="teams">
                <a>Teams</a>
              </Link>
            </li>
            <li className="mr-4 text-xl cursor-pointer">
              <Link to="rules">
                <a>Rules</a>
              </Link>
            </li>
            <li className="mr-4 text-xl cursor-pointer">
              <Link to="games">
                <a>Games</a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          {isLogin ? (
            <button className="mr-4 text-lg font-medium">Logout</button>
          ) : (
            <button className="mr-4 text-lg font-medium">Login</button>
          )}

          <button className="w-28 p-1.5 bg-blue rounded-md font-medium text-white">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
