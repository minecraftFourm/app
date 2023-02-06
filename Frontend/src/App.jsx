import { lazy, Suspense, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./Components/Navbar";
import CheckAuth from "./Contexts/CheckAuth";
import ViewPost from "./Pages/ViewPost";
import { io } from "socket.io-client";

const Home = lazy(() => import("./Pages/Homepage"));
const Forum = lazy(() => import("./Pages/Forum/Forumpage"));
const Rules = lazy(() => import("./Pages/Rulespage"));
const Footer = lazy(() => import("./Components/Footer"));
const Games = lazy(() => import("./Pages/Gamespage"));
const Login = lazy(() => import("./Pages/Authentication/LoginPage"));
const Register = lazy(() => import("./Pages/Authentication/Registerpage"));
const RedirectAuth = lazy(() => import("./Contexts/RedirectAuth"));
const Announcements = lazy(() => import("./Pages/Dashboard/Announcements"));
const AnnouncementHome = lazy(() =>
	import("./Pages/Dashboard/AnnouncementHome")
);
const EditAnnouncement = lazy(() => import("./Pages/EditAnnouncement"));
const ViewAnnouncement = lazy(() => import("./Pages/ViewAnnouncement"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const NewAnnouncement = lazy(() => import("./Pages/Dashboard/NewAnnouncement"));
const Posts = lazy(() => import("./Pages/Forum/PostsInCategory"));
const NotFound = lazy(() => import("./Pages/NotFoundPage"));
const NewPost = lazy(() => import("./Pages/NewPost"));
const EditPost = lazy(() => import("./Pages/EditPost"));
const AdminOnly = lazy(() => import("./Contexts/AdminOnly"));
const RequireAuth = lazy(() => import("./Contexts/RequireAuth"));
const socket = io.connect("http://localhost:5000", {
	transports: ["websocket"],
});
// socket.emit("join", "Hello World from client");

function App() {
	const NavAndFooter = () => {
		return (
			<>
				{/* TODO: Change to a proper loading screen  */}
				<Navbar />
				<Outlet />
				<Footer />
			</>
		);
	};

	const Nav = () => {
		return (
			<>
				<Navbar />
				<Outlet />
			</>
		);
	};

	const toastOptions = {
		success: {
			style: {
				background: "green",
				color: "white",
			},
		},
		error: {
			style: {
				background: "red",
				color: "white",
			},
		},
		loading: {
			style: {
				background: "yellow",
				color: "white",
			},
		},
	};

	return (
		<div className="overflow-hidden">
			<Suspense>
				<CheckAuth>
					<Toaster toastOptions={toastOptions} />

					<Routes>
						{/* TODO: Add adminOnly middlewear */}
						<Route path="/dashboard" element={<Dashboard />}>
							<Route
								element={<Announcements />}
								path="announcement"
							/>
						</Route>

						<Route element={<NavAndFooter />}>
							<Route path="/" element={<Home />} />
							<Route path="/rules" element={<Rules />} />
							<Route path="/games" element={<Games />} />
							<Route path="/forum" element={<Forum />} />
							<Route
								path="forum/post/:id"
								element={
									// <AdminOnly>
									// 	<ViewAnnouncement />
									// </AdminOnly>
									<ViewPost />
								}
							/>
							<Route
								path="forum/edit/:id"
								element={
									<RequireAuth>
										<EditAnnouncement />
									</RequireAuth>
								}
							/>
							<Route
								path="forum/category/:id"
								element={<Posts />}
							/>
							<Route element={<AnnouncementHome />} path="" />
							<Route
								element={<NewAnnouncement />}
								path="newAnnouncement"
							/>
							<Route
								path="forum/new"
								element={
									<RequireAuth>
										{" "}
										<NewPost />{" "}
									</RequireAuth>
								}
							/>
						</Route>

						<Route element={<Nav />}>
							<Route element={<RedirectAuth />}>
								<Route path="/login" element={<Login />} />
								<Route
									path="/register"
									element={<Register />}
								/>
							</Route>
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</CheckAuth>
			</Suspense>
		</div>
	);
}

export default App;
