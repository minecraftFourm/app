import { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// const InfoBar = lazy(() => import("./Components/InformationBar"));
// const Navbar = lazy(() => import("./Components/Navbar"));
// const CheckAuth = lazy(() => import("./Contexts/CheckAuth"));
// const ViewPost = lazy(() => import("./Pages/Forum/Post/ViewPost"));
// const Profile = lazy(() => import("./Pages/ProfilePage"));
// const Home = lazy(() => import("./Pages/Homepage"));
// const Forum = lazy(() => import("./Pages/Forum/Forumpage"));
// const Rules = lazy(() => import("./Pages/Rule/Rulespage"));
// const Rule = lazy(() => import("./Pages/Rule/Rule"));
// const Games = lazy(() => import("./Pages/Gamespage"));
// const Login = lazy(() => import("./Pages/Authentication/LoginPage"));
// const Register = lazy(() => import("./Pages/Authentication/Registerpage"));
// const RedirectAuth = lazy(() => import("./Contexts/RedirectAuth"));
// const Announcements = lazy(() => import("./Pages/Dashboard/Announcements"));
// const Dashboard = lazy(() => import("./Pages/Dashboard"));
// const Posts = lazy(() => import("./Pages/Forum/PostsInCategory"));
// const NotFound = lazy(() => import("./Pages/NotFoundPage"));
// const NewPost = lazy(() => import("./Pages/Forum/Post/NewPost"));
// const EditPost = lazy(() => import("./Pages/Forum/Post/EditPost"));
// const MaintenancePage = lazy(() => import("./Pages/MaintenancePage"));
// const RequireAuth = lazy(() => import("./Contexts/RequireAuth"));
// const EditProfilePage = lazy(() => import("./Pages/EditProfilePage"));

import Footer from "./Components/Footer";
import InfoBar from "./Components/InformationBar";
import Navbar from "./Components/Navbar";
import CheckAuth from "./Contexts/CheckAuth";
import ViewPost from "./Pages/Forum/Post/ViewPost";
import Profile from "./Pages/ProfilePage";
import Home from "./Pages/Homepage";
import Forum from "./Pages/Forum/Forumpage";
import Rules from "./Pages/Rule/Rulespage";
import Rule from "./Pages/Rule/Rule";
import Footer from "./Components/Footer";
import Games from "./Pages/Gamespage";
import Login from "./Pages/Authentication/LoginPage";
import Register from "./Pages/Authentication/Registerpage";
import RedirectAuth from "./Contexts/RedirectAuth";
import Announcements from "./Pages/Dashboard/Announcements";
import Dashboard from "./Pages/Dashboard";
import Posts from "./Pages/Forum/PostsInCategory";
import NotFound from "./Pages/NotFoundPage";
import NewPost from "./Pages/Forum/Post/NewPost";
import EditPost from "./Pages/Forum/Post/EditPost";
import MaintenancePage from "./Pages/MaintenancePage";
import RequireAuth from "./Contexts/RequireAuth";
import EditProfilePage from "./Pages/EditProfilePage";
import EditRule from "./Pages/Rule/EditRule";
import NewRule from "./Pages/Rule/NewRule";

// import InformationBar from "./Components/InformationBar";
// import Navbar from "./Components/Navbar";
// import CheckAuth from "./Contexts/CheckAuth";
// import ViewPost from "./Pages/ViewPost";
// import Profile from "./Pages/UserProfilePage";
// import Settings from "./Contexts/Settings";
// const AdminOnly = lazy(() => import("./Contexts/AdminOnly"));
// const EditAnnouncement = lazy(() => import("./Pages/EditAnnouncement"));
// const ViewAnnouncement = lazy(() => import("./Pages/ViewAnnouncement"));
// const User = lazy(() => import("./Pages/UserProfilePage"));

function App() {
	const FooterComponent = () => {
		return (
			<>
				<Outlet />
				<Footer />
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
				<InfoBar />
				<Navbar />

				<CheckAuth>
					<Toaster toastOptions={toastOptions} />

					<Routes>
						<Route
							path="/dashboard"
							element={
								<RequireAuth>
									<Dashboard />
								</RequireAuth>
							}>
							<Route
								element={<Announcements />}
								path="announcement"
							/>
						</Route>

						<Route
							path="/maintenance"
							element={<MaintenancePage />}
						/>

						<Route element={<FooterComponent />}>
							<Route path="/" element={<Home />} />
							<Route path="/rules" element={<Rules />} />
							{/* TODO: Rules display page. */}
							<Route path="/rules/:id" element={<Rule />} />
							<Route
								path="/rules/edit/:id"
								element={<EditRule />}
							/>
							<Route path="/rules/new" element={<NewRule />} />
							<Route path="/games" element={<Games />} />
							<Route path="/forum" element={<Forum />} />
							<Route path="/user/:id" element={<Profile />} />
							<Route
								path="/edit-profile"
								element={
									<RequireAuth>
										<EditProfilePage />
									</RequireAuth>
								}
							/>
							<Route
								path="/profile"
								element={
									<RequireAuth>
										<Profile />
									</RequireAuth>
								}
							/>
							<Route
								path="forum/post/:id"
								element={<ViewPost />}
							/>
							<Route
								path="forum/edit/:id"
								element={
									<RequireAuth>
										<EditPost />
									</RequireAuth>
								}
							/>
							<Route
								path="forum/category/:id"
								element={<Posts />}
							/>
							<Route
								path="forum/new"
								element={
									<RequireAuth>
										<NewPost />
									</RequireAuth>
								}
							/>
						</Route>

						<Route>
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
