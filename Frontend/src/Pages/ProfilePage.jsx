import React, { useState, useEffect, lazy } from "react";
import Rectangle26 from "../assets/Rectangle26.png";
import Rectangle7 from "../assets/Rectangle7.png";
// import pretty from '../assets/pretty.png'
import { LoadingIcon } from "../Components/Icons";
import UserBackground1 from "../assets/user-background-1.jpg";
import UserBackground2 from "../assets/user-background-2.jpg";
import UserBackground3 from "../assets/user-background-3.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../Contexts/Fetch";
import { UseUser } from "../Contexts/UserContext";
import Overlay from "../Components/Overlay";
import Announcement from "../Components/HomePage/Announcement";
import { toast } from "react-hot-toast";
import DisplayActivities from "../Components/Users/DisplayActivities";
import DisplayUsers from "../Components/Users/DisplayUsers";
const EditUser = lazy(() => import("../Components/Users/EditUser"));

const UserProfilePage = () => {
	const { id } = useParams();
	const [user, setUser] = useState({});
	const [activity, setActivity] = useState({});
	const [followingStatus, setFollowingStatus] = useState(false);
	const [error, setError] = useState(null);
	const [tab, setTab] = useState("postings");
	const [isLoading, setIsLoading] = useState(true);
	const CustomFetch = useFetch();
	const User = UseUser();
	const [banner, setBanner] = useState(null);
	const Navigate = useNavigate();

	// const bannerList = [
	//   Rectangle21,
	//   Rectangle22,
	//   Rectangle23,
	//   Rectangle24,
	//   Rectangle25,
	// ];
	const bannerList = [UserBackground1, UserBackground2, UserBackground3];

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				await fetchData();
			} catch (error) {
				console.log(error);
				Navigate("/notfound");
				setError(true);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [id]);

	const fetchData = async () => {
		const userId = id ? id : User.id;
		const { data, response } = await CustomFetch({
			url: `user/${userId}`,
			returnResponse: true,
		});

		if (!response.ok) throw new Error();
		setUser(data.data);

		// *An array of the user's posts, and comments arranged in acending order of update
		// TODO: add a way of changing the order
		const activities = [...data.data.comments, ...data.data.post];
		activities.sort((a, b) => {
			return new Date(b.updated) - new Date(a.updated);
		});
		setActivity(activities);

		// Checks if the active user is authenticated and is a follower of the user being displayed.
		if (data.data.followers && User.isAuthenticated) {
			const isFollowing = data.data.followers.some((user) => {
				console.log(user.referringUser.id === User.id);
				return user.referringUser.id === User.id;
			});
			setFollowingStatus(isFollowing);
		}
	};

	useEffect(() => {
		const tab = sessionStorage.getItem("tab");
		if (tab) {
			setTab(() => tab);
		}
	}, []);

	const updateTab = (newTab) => {
		// console.log(newTab);
		sessionStorage.setItem("tab", newTab);
		setTab(() => newTab);
	};

	const followUser = async () => {
		const Request = CustomFetch({
			url: "user/follow",
			options: {
				method: "PATCH",
				body: JSON.stringify({
					id: id,
				}),
			},
			returnPromise: true,
		});

		toast.promise(Request, {
			loading: `${followingStatus ? "Unfollowing" : "Following"} user.`,
			success: (data) => {
				(async () => {
					await fetchData();
				})();
				return `Sucessfully ${
					followingStatus ? "Unfollowed" : "Followed"
				} user!`;
			},
			error: (err) => {
				console.log(err);
				return `An error occured while ${
					followingStatus ? "unfollowing" : "following"
				} your post!`;
			},
		});
	};

	return (
		<div className="bg-[#1B263B]">
			{isLoading && <LoadingIcon />}
			{!isLoading && !error && (
				<div className="pt-16 px-8 w-full flex flex-col">
					<div className="relative h-[250px] w-full flex justify-end mb-2">
						<img
							src={user.banner.url && user.banner.url}
							alt=""
							className="w-full h-full object-cover"
						/>
						<Overlay title="" />
						<div className="absolute top-0 right-0 flex flex-row gap-1">
							{/* Need to change the banner list to data pulled from DB - currently saved on FE */}
							{User.isAuthenticated &&
								User.id === user.id &&
								bannerList.map((item) => {
									return (
										<img
											key={item}
											src={item}
											onClick={() => {
												setBanner(item);
											}}
											className="w-[32px] h-[32px] cursor-pointer border border-gray-500"
										/>
									);
								})}
						</div>

						<div className="absolute -bottom-32 sm:-bottom-0 w-full flex flex-row gap-0">
							<div className="sm:w-full w-[250px] flex flex-col items-center">
								<img
									src={user.profilePicture}
									className="w-[200px] h-[200px] sm:w-[40px] sm:h-[40px] object-cover rounded-full"
									alt={`${user.username}'s profile picture`}
								/>
								<div className="flex flex-col items-center">
									<h3 className="text-white capitalize text-lg sm:text-md font-medium">
										{user.username}
									</h3>
									<p
										style={{
											backgroundColor: user.role.color,
										}}
										className="text-white w-full px-4 rounded-sm">
										{user.role.title}
									</p>
								</div>
							</div>
							<p className="text-gray-300 text-sm py-1 px-2 border border-gray-800 w-[85%] ml-auto h-fit line-clamp-2">
								{user.bio}
							</p>
						</div>
					</div>

					<div className="w-[85%] sm:w-full lg:w-[75%] flex flex-col gap-2 self-end  z-10">
						<div className="flex flex-row text-white w-full">
							<p className="mx-6">
								Followers {user.followers.length}
							</p>
							<p>Following {user.following.length}</p>
							{User.isAuthenticated && User.id !== user.id && (
								<button
									onClick={followUser}
									className="bg-[#7F7EFF] ml-auto hover:bg-[#7F7EFF] text-white py-1 px-7 w-fit rounded-sm">
									{followingStatus ? "Unfollow" : "Follow"}
								</button>
							)}
						</div>

						<div className="flex flex-row gap-3 w-full sm:w-full bg-white py-2 px-4 self-end mt-10 rounded-sm">
							<button
								onClick={() => updateTab("postings")}
								className={`hover:text-[#7F7EFF] transition-colors duration-300 cursor-pointer ${
									tab === "postings" ? "text-[#7F7EFF]" : ""
								}`}>
								Postings
							</button>
							<button
								className={`hover:text-[#7F7EFF] transition-colors duration-300 cursor-pointer ${
									tab === "activity" ? "text-[#7F7EFF]" : ""
								}`}
								onClick={() => updateTab("activity")}>
								Activity
							</button>
							<button
								onClick={() => updateTab("about")}
								className={`hover:text-[#7F7EFF] transition-colors duration-300 cursor-pointer ${
									tab === "about" ? "text-[#7F7EFF]" : ""
								}`}>
								About
							</button>
							{/* TODO: Add permission support */}
							{/* User is authenticated, and the Active User's id is equal to the user's profile id meaning they're the owner of the profile. */}
							{User.isAuthenticated && User.id === user.id && (
								<p
									onClick={() => updateTab("edit")}
									className={`${
										tab === "edit" ? "text-[#7F7EFF]" : ""
									}cursor-pointer hover:text-[#7F7EFF] transition-colors duration-300 ml-auto`}>
									Edit
								</p>
							)}
						</div>
					</div>

					<div className="border-b-4  my-4 border-gray-700"></div>
					<div className="pb-10">
						{/* card */}
						{tab === "postings" && (
							<div className="flex flex-col gap-2">
								{user.post.length != 0 && (
									<Announcement items={user.post} />
								)}
								{user.post.length === 0 && (
									<h6 className="text-white text-center">
										This user currently has no posts.
									</h6>
								)}
							</div>
						)}
						{tab === "activity" && (
							<>
								{activity && (
									<DisplayActivities
										activity={activity}
										owner={user}
									/>
								)}
								{!activity && (
									<p className="text-white w-full text-center text-lg font-medium">
										{user.username} currently has no
										activity.
									</p>
								)}
							</>
						)}
						{tab === "edit" && <EditUser user={User} />}
						{tab === "about" && (
							<div className="text-white my-2">
								<h4 className="text-sm font-medium">Bio:</h4>
								<p className="ml-4">{user.bio}</p>

								<h4 className="text-xl mt-4 font-medium">
									Socials:
								</h4>

								<ul className="text-sm ml-4">
									{user.mc_username && (
										<li>
											<span className="font-medium">
												Minecraft Username:
											</span>{" "}
											{user.mc_username}
										</li>
									)}
									{user.discord && (
										<li>
											<span className="font-medium">
												Discord:
											</span>{" "}
											{user.discord}
										</li>
									)}
									{user.instagram && (
										<li>
											<span className="font-medium">
												Instagram:
											</span>{" "}
											{user.instagram}
										</li>
									)}
									{user.email && user.showMail && (
										<li>
											<span className="font-medium">
												Email:
											</span>{" "}
											<a mailto={user.email}>
												{user.email}
											</a>
										</li>
									)}
								</ul>

								{user.following.length != 0 && (
									<div>
										<h4 className="text-xl mt-4 font-medium">
											Following ({user.following.length}):
										</h4>
										{/* TODO: Turn it into a slider */}
										<DisplayUsers users={user.following} />
									</div>
								)}

								{user.followers.length != 0 && (
									<div>
										<h4 className="text-xl mt-4 font-medium">
											Followers ({user.followers.length}):
										</h4>
										{/* TODO: Turn it into a slider */}
										<DisplayUsers users={user.followers} />
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserProfilePage;
