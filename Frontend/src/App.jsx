import { lazy, Suspense, useState } from "react";
import Navbar from "./Components/Navbar";
import { createBrowserRouter, Route, Routes } from "react-router-dom";
import CheckAuth from "./Contexts/CheckAuth";
import Footer from "./Components/Footer";
import ViewAnnouncement from "./Pages/ViewAnnouncement";
import EditAnnouncement from "./Pages/EditAnnouncement";
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

function App() {
	return (
		<Suspense>
			<Routes>
				<Route element={<CheckAuth />}>
					{/* TODO: Add adminOnly middlewear */}
					<Route path="/dashboard" element={<Dashboard />}>
						<Route element={<AnnouncementHome />} path="" />
						<Route
							element={<NewAnnouncement />}
							path="newAnnouncement"
						/>
						<Route
							element={<Announcements />}
							path="announcement"
						/>
					</Route>

					<Route element={<Navbar />}>
						<Route element={<Footer />}>
							<Route path="/" element={<Home />} />
							<Route path="/rules" element={<Rules />} />
							<Route path="/games" element={<Games />} />
							<Route path="/forum" element={<Forum />} />
							<Route
								path="forum/post/:id"
								element={<ViewAnnouncement />}
							/>
							<Route
								path="forum/edit/:id"
								element={<EditAnnouncement />}
							/>
							<Route
								path="forum/category/:id"
								element={<Posts />}
							/>
						</Route>

						<Route element={<RedirectAuth />}>
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
						</Route>
					</Route>
				</Route>
			</Routes>
		</Suspense>
	);
}

export default App;
