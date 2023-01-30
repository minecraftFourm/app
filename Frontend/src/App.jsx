import { lazy, Suspense, useState } from "react";
import Navbar from "./Components/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import CheckAuth from "./Contexts/CheckAuth";
import Footer from "./Components/Footer";
import ViewAnnouncement from "./Pages/ViewAnnouncement";
import EditAnnouncement from "./Pages/EditAnnouncement";
import { Toaster } from "react-hot-toast";
import RequireAuth from "./Contexts/RequireAuth";
import AdminOnly from "./Contexts/AdminOnly";
import UserProfilePage from './Pages/UserProfilePage'

const Home = lazy(() => import("./Pages/Homepage"));
const Forum = lazy(() => import("./Pages/Forum/Forumpage"));
const Rules = lazy(() => import("./Pages/Rulespage"));
const Games = lazy(() => import("./Pages/Gamespage"));
const Login = lazy(() => import("./Pages/Authentication/LoginPage"));
const Register = lazy(() => import("./Pages/Authentication/Registerpage"));
const RedirectAuth = lazy(() => import("./Contexts/RedirectAuth"));
const Announcements = lazy(() => import("./Pages/Dashboard/Announcements"));
const AnnouncementHome = lazy(() =>
	import("./Pages/Dashboard/AnnouncementHome")
);
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const NewAnnouncement = lazy(() => import("./Pages/Dashboard/NewAnnouncement"));
const Posts = lazy(() => import("./Pages/Forum/PostsInCategory"));
const NotFound = lazy(() => import("./Pages/NotFoundPage"));
const NewPost = lazy(() => import("./Pages/NewPost"));

function App() {
	const NavAndFooter = () => {
		return (
			<>
				<Navbar />
				{/* TODO: Change to a proper loading screen  */}
				<Suspense fallback={<h1>Loading...</h1>}>
					<Outlet />
				</Suspense>
				<Footer />
			</>
		);
	};

	const Nav = () => {
		return (
			<>
				<Navbar />
				<Suspense fallback={<h1>Loading...</h1>}>
					<Outlet />
				</Suspense>
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
	};

	return (
		<div className="overflow-hidden">
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
						<Route path="/userpage" element={<UserProfilePage/>} />
						<Route
							path="forum/post/:id"
							element={
								<AdminOnly>
									<ViewAnnouncement />
								</AdminOnly>
							}
						/>
						<Route
							path="forum/edit/:id"
							element={
								<RequireAuth>
									{" "}
									<EditAnnouncement />{" "}
								</RequireAuth>
							}
						/>
						<Route path="forum/category/:id" element={<Posts />} />
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
							<Route path="/register" element={<Register />} />
						</Route>
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</CheckAuth>
		</div>
	);
}

export default App;
