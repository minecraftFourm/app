import React, { Suspense, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import { UseSetUser, UseUser } from "../Contexts/UserContext";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
	const Navigate = useNavigate();
	const user = UseUser();
	const setUser = UseSetUser();
	const activeStyle = {
		fontWeight: "500",
		color: "#6366f1",
	};

	const [nav, setNav] = useState(false);
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
		<div
			className="relative z-20 grid h-16 bg-white drop-shadow-lg w-full"
			id="header">
			<div className="flex z-20 justify-between px-4 items-center w-full">
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
							<Link to={`user/${user.id}`}>
								<img
									src={user.profilePicture}
									className="w-[48px] h-[48px] object-cover object-center rounded-full "
									alt=""
								/>
							</Link>
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
				<div
					onClick={handleNav}
					className="hidden md:block cursor-pointer">
					{nav ? "" : <AiOutlineMenu size={30} />}
				</div>
				<ul
					className={
						nav
							? "fixed right-4 sm:right-0 text-black top-4 mobile-nav-shadow max-w-[300px] w-full sm:w-full bg-white ease-in-out duration-500 z-50"
							: "ease-in-out duration-500 top-6 fixed right-[-100%] bg-white"
					}>
					<li
						onClick={handleNav}
						className="absolute top-3 right-3 m-3 cursor-pointer">
						<AiOutlineClose size={20} />
					</li>

					<li onClick={handleNav} className="mt-8 p-4 ml-2">
						<NavLink
							to="/"
							style={({ isActive }) =>
								isActive ? activeStyle : undefined
							}>
							Home
						</NavLink>
					</li>
					<li onClick={handleNav} className="p-4 ml-2">
						<NavLink
							to="forum"
							style={({ isActive }) =>
								isActive ? activeStyle : undefined
							}>
							Forum
						</NavLink>
					</li>
					<li onClick={handleNav} className="p-4 ml-2">
						<NavLink
							to="rules"
							style={({ isActive }) =>
								isActive ? activeStyle : undefined
							}>
							Rules
						</NavLink>
					</li>
					<li onClick={handleNav} className="p-4 ml-2">
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
							className="p-6 flex flex-row gap-4">
							<Link to={`user/${user.id}`}>
								<img
									src={user.profilePicture}
									className="w-[48px] h-[48px] object-cover object-center rounded-full "
									alt=""
								/>
							</Link>
							<button
								className="mr-4 text-md font-medium text-center"
								onClick={handleLogout}>
								Logout
							</button>
						</li>
					) : (
						<li
							onClick={handleNav}
							className="p-6 mt-10 mx-5 border-t-4 text-center">
							<NavLink
								to={"./login"}
								className="mr-4 text-lg font-medium hover:text-indigo-300 duration-300 text-black">
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
