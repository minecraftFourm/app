import React, { useState, useEffect } from "react";
import Rectangle26 from "../assets/Rectangle26.png";
import Rectangle7 from "../assets/Rectangle7.png";
// import pretty from '../assets/pretty.png'
import { LoadingIcon } from "../Components/Icons";
import UserBackground1 from "../assets/user-background-1.jpg";
import UserBackground2 from "../assets/user-background-2.jpg";
import UserBackground3 from "../assets/user-background-3.jpg";
import { useParams } from "react-router-dom";
import { useFetch } from "../Contexts/Fetch";
import { UseUser } from "../Contexts/UserContext";
import Overlay from "../Components/Overlay";
import Announcement from "../Components/HomePage/Announcement";

const UserProfilePage = () => {
	const { id } = useParams();
	const [user, setUser] = useState({});
	const [error, setError] = useState(null);
	const [tab, setTab] = useState("postings");
	const [isLoading, setIsLoading] = useState(true);
	const CustomFetch = useFetch();
	const User = UseUser();
	const [banner, setBanner] = useState(null);

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
				const userId = id ? id : User.id;
				setIsLoading(true);
				const { data, response } = await CustomFetch({
					url: `user/${userId}`,
					returnResponse: true,
				});
				if (!response.ok) throw new Error();
				setUser(data.data);
			} catch (error) {
				console.log(error);
				setError(true);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [id]);

	// console.log(user);

	const updateTab = (newTab) => {
		// console.log(newTab);
		setTab(() => newTab);
	};

	return (
		<div className="bg-[#1B263B]">
			{isLoading && <LoadingIcon />}
			{!isLoading && !error && (
				<div className="pt-16 px-8 w-full flex flex-col">
					<div className="relative h-[250px] w-full flex justify-end mb-2">
						<img
							src={banner}
							alt=""
							className="w-full h-full object-cover"
						/>
						<Overlay title="" />
						<div className="absolute top-0 right-0 flex flex-row gap-1">
							{/* Need to change the banner list to data pulled from DB - currently saved on FE */}
							{bannerList.map((item) => {
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
						<div className="flex flex-row text-white  w-full">
							<p className="mr-6">Followers 250</p>
							<p>Following 100</p>
							<button className="bg-[#7F7EFF] ml-auto hover:bg-[#7F7EFF] text-white py-1 px-7 w-fit font-bold rounded-sm">
								Follow
							</button>
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
							<p
								onClick={() => updateTab("edit")}
								className={`${
									tab === "edit" ? "text-[#7F7EFF]" : ""
								}cursor-pointer hover:text-[#7F7EFF] transition-colors duration-300 ml-auto`}>
								Edit
							</p>
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
								<h4>Activity Tab</h4>
							</>
						)}
						{tab === "about" && (
							<>
								<h4>About Tab</h4>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserProfilePage;
