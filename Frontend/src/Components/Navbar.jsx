import React, { Suspense, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import { UseSetUser, UseUser } from "../Contexts/UserContext";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
	const Navigate = useNavigate();
	const user = UseUser();
	const setUser = UseSetUser();
	const [nav, setNav] = useState(false);
	const activeStyle = {
		fontWeight: "500",
		color: "#6366f1",
	};

	//toggler if md
	const handleNav = () => {
		setNav(!nav);
	};

	const handleLogout = async () => {
		// TODO: convert to using custom fetch, and handle errors
		const response = await fetch(`${API_URL}/logout`, {
			method: "POST",
			credentials: "include",
		});
		if (response.ok) {
			setUser({ isAuthenticated: false, username: "", id: "" });
			Navigate("login"); // Navigate to login page
		}
	};

	return (
		<div className="grid h-16 bg-white drop-shadow-lg w-full" id="header">
			<div className="flex justify-between px-4 items-center w-full">
				<div>
					<Link
						to={"/"}
						className="text-2xl font-bold cursor-pointer">
						Servername
					</Link>
				</div>
				<div className="md:hidden">
					<ul className="flex justify-between">
						<li className="mr-4 text-xl hover:text-indigo-300 cursor-pointer">
							<NavLink
								to="/"
								style={({ isActive }) =>
									isActive ? activeStyle : undefined
								}>
								Home
							</NavLink>
						</li>
						<li className="mr-4 text-xl cursor-pointer hover:text-indigo-300 duration-300">
							<NavLink
								to="forum"
								style={({ isActive }) =>
									isActive ? activeStyle : undefined
								}>
								Forum
							</NavLink>
						</li>
						<li className="mr-4 text-xl cursor-pointer hover:text-indigo-300 duration-300">
							<NavLink
								to="rules"
								style={({ isActive }) =>
									isActive ? activeStyle : undefined
								}>
								Rules
							</NavLink>
						</li>
						<li className="mr-4 text-xl cursor-pointer hover:text-indigo-300 duration-300">
							<NavLink
								to="games"
								style={({ isActive }) =>
									isActive ? activeStyle : undefined
								}>
								Games
							</NavLink>
						</li>
					</ul>
				</div>
				<div className="md:hidden">
					{user.isAuthenticated ? (
						<div className="flex flex-row items-center gap-2">
							<img
								src={user.profilePicture}
								className="w-[48px] h-[48px] object-cover object-center rounded-full "
								alt=""
							/>
							<button
								className="mr-4 text-sm font-medium"
								onClick={handleLogout}>
								Logout
							</button>
						</div>
					) : (
						<div className="flex flex-row gap-2 items-center">
							<NavLink
								to={"./login"}
								className="mr-4 text-lg font-medium hover:text-indigo-300 duration-300">
								Login
							</NavLink>
							<NavLink
								to={"./register"}
								className="py-1 px-4 bg-indigo-500 rounded-md font-medium text-white hover:bg-indigo-700 duration-300">
								Register
							</NavLink>
						</div>
					)}
				</div>
				<div onClick={handleNav} className="invisible md:visible">
					{nav ? (
						<AiOutlineClose size={30} />
					) : (
						<AiOutlineMenu size={30} />
					)}
				</div>
				<ul
					className={
						nav
							? "absolute left-0 text-white top-0 w-[85%] z-20 h-[100%] border-r border-r-gray-900 bg-[#4338ca] ease-in-out duration-500"
							: "ease-in-out duration-500 absolute left-[-100%] bg-[#4338ca]"
					}>
					<li className="w-full text-2xl font-bold m-4">
						Servername
					</li>
					<li
						onClick={handleNav}
						className="p-6 border-b-8 bg-[#180f7c]  border-indigo-300">
						<NavLink
							to="/"
							style={({ isActive }) =>
								isActive ? activeStyle : undefined
							}>
							Home
						</NavLink>
					</li>
					<li
						onClick={handleNav}
						className="p-6 border-b-8 bg-[#180f7c] border-indigo-300">
						<NavLink
							to="forum"
							style={({ isActive }) =>
								isActive ? activeStyle : undefined
							}>
							Forum
						</NavLink>
					</li>
					<li
						onClick={handleNav}
						className="p-6 border-b-8 bg-[#180f7c] border-indigo-300">
						<NavLink
							to="rules"
							style={({ isActive }) =>
								isActive ? activeStyle : undefined
							}>
							Rules
						</NavLink>
					</li>
					<li
						onClick={handleNav}
						className="p-6 border-b-8 bg-[#180f7c] border-indigo-300">
						<NavLink
							to="games"
							style={({ isActive }) =>
								isActive ? activeStyle : undefined
							}>
							Games
						</NavLink>
					</li>
					{user.isAuthenticated ? (
						<li
							onClick={handleNav}
							className="p-6 border-b-8 bg-[#180f7c] border-indigo-300">
							<img
								src={user.profilePicture}
								className="w-[48px] h-[48px] object-cover object-center rounded-full "
								alt=""
							/>
							<button
								className="mr-4 text-sm font-medium"
								onClick={handleLogout}>
								Logout
							</button>
						</li>
					) : (
						<li
							onClick={handleNav}
							className="p-6 border-b-8 bg-[#180f7c] border-indigo-300">
							<NavLink
								to={"./login"}
								className="mr-4 text-lg font-medium hover:text-indigo-300 duration-300 text-white">
								Login
							</NavLink>
							<NavLink
								to={"./register"}
								className="py-1 px-4 bg-indigo-500 rounded-md font-medium text-white hover:bg-indigo-700 duration-300">
								Register
							</NavLink>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
