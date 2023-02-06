import React, { useState, useEffect } from "react";
import Rectangle26 from "../assets/Rectangle26.png";
import Rectangle7 from "../assets/Rectangle7.png";
// import pretty from '../assets/pretty.png'
import { LoadingIcon } from "../Components/Icons";
import Rectangle21 from "../assets/Rectangle21.png";
import Rectangle22 from "../assets/Rectangle22.png";
import Rectangle23 from "../assets/Rectangle23.png";
import Rectangle24 from "../assets/Rectangle24.png";
import Rectangle25 from "../assets/Rectangle25.png";
import { useParams } from "react-router-dom";
import { useFetch } from "../Contexts/Fetch";

const UserProfilePage = () => {
	const { id } = useParams();
	const [user, setUser] = useState({});
	const [error, setError] = useState(null);
	const [tab, setTab] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const CustomFetch = useFetch();

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const { data, response } = await CustomFetch({
					url: `user/${id}`,
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

	const updateTab = (newTab) => {
		setTab(() => newTab);
	};

	return (
		<div className="bg-[#1B263B]">
			{isLoading && <LoadingIcon />}
			{!isLoading && !error && (
				<>
					<div className="relative m h-50 rounded-b flex justify-center pt-20 mb-24 mx-12">
						<img src={Rectangle26} />
						<div className="absolute top-24 right-36 h-8 w-8 flex">
							<img src={Rectangle21} />
							<img src={Rectangle22} />
							<img src={Rectangle23} />
							<img src={Rectangle24} />
							<img src={Rectangle25} />
						</div>
						<div className="absolute -bottom-24 left-2">
							<img
								src={user.profilePicture}
								className="object-cover font-bold w-36 h-36 rounded-full"
							/>
							<p className="pl-7 text-white font-bold text-3xl">
								{user.username}
							</p>
							<button
								style={{ backgroundColor: user.role.color }}
								className=" text-white ml-9 px-5 py-1 font-bold rounded text-xs shadow-2xl">
								{user.role.title}
							</button>
						</div>
						<div className="absolute inset-x-0 -bottom-9">
							{user.bio && (
								<p className="text-white ml-44 mr-6 p-1 border-2 border-gray-700 rounded-sm">
									{user.bio}
								</p>
							)}
							<div className="flex pt-6 ml-48 text-white">
								<p>Followers {user.followers.length}</p>
								<p className="pl-5">
									Following {user.following.length}
								</p>
							</div>
						</div>
						<div className="absolute -bottom-20 right-7 h-16 w-16 mr-3">
							<button className="bg-[#7F7EFF] hover:bg-[#7F7EFF] text-white py-1 px-7 font-bold rounded-sm">
								Follow
							</button>
						</div>
					</div>
					<div className="flex flex-row bg-white mr-16 ml-48 py-2 pl-3 gap-4 rounded-sm text-gray-500">
						<p
							onClick={() => updateTab("postings")}
							className="hover:text-[#7F7EFF] cursor-pointer">
							Postings
						</p>
						<p
							onClick={() => updateTab("activity")}
							className="hover:text-[#7F7EFF] cursor-pointer">
							Activity
						</p>
						<p
							onClick={() => updateTab("about")}
							className="hover:text-[#7F7EFF] cursor-pointer">
							About
						</p>
						{/* TODO: Add permission support */}
						<p
							onClick={() => updateTab("edit")}
							className="cursor-pointer hover:text-[#7F7EFF]">
							Edit
						</p>
					</div>
					<div className="border-b-4 mx-16 my-4 border-gray-700"></div>
					<div className="pb-10">
						{/* card */}
						{tab === "postings" && (
							<>
								<div className="flex justify-center">
									<div className="rounded-sm shadow-lg bg-white w-11/12">
										<div className="flex bg-[#7F7EFF] py-2 rounded-sm">
											<div className="pl-2 text-white">
												Brand New Announcement
											</div>
											<div className="absolute right-16 text-white">
												30 minutes ago
											</div>
										</div>
										<img
											className="rounded-t-lg w-full p-2"
											src={Rectangle7}
											alt=""
										/>
										<div className="p-6">
											<p className="text-gray-700 text-base mb-4">
												Some quick example text to build
												on the card title and make up
												the bulk of the card's content.
												loren loren sinta buko ng papaya
												dalay dalay dusdos sisingalan ng
												tanga bakit walang buko lusot
												laparanang may hakdog ng iba
												bahay kubo kahit munti ang
												larangan doon ay sari sari
												singkamas at talong bawang at
												sibuyas na 700 pesos isang kilo
												kundol patola upot kalabasa at
												marami pang iba ang mahal ng
												sibuyas
											</p>
										</div>
										<div className="flex bg-gray-300 text-gray-500 p-2">
											<p className="pl-2">
												Posted By: Admin User
											</p>
											<p className="absolute right-16">
												120 Comments
											</p>
										</div>
									</div>
								</div>
								<div className="flex justify-center mt-2">
									<div className="rounded-sm shadow-lg bg-white w-11/12">
										<div className="flex bg-[#7F7EFF] py-2 rounded-sm">
											<div className="pl-2 text-white">
												Brand New Announcement
											</div>
											<div className="absolute right-16 text-white">
												30 minutes ago
											</div>
										</div>
										<img
											className="rounded-t-lg w-full p-2"
											src={Rectangle7}
											alt=""
										/>
										<div className="p-6">
											<p className="text-gray-700 text-base mb-4">
												Some quick example text to build
												on the card title and make up
												the bulk of the card's content.
												loren loren sinta buko ng papaya
												dalay dalay dusdos sisingalan ng
												tanga bakit walang buko lusot
												laparanang may hakdog ng iba
												bahay kubo kahit munti ang
												larangan doon ay sari sari
												singkamas at talong bawang at
												sibuyas na 700 pesos isang kilo
												kundol patola upot kalabasa at
												marami pang iba ang mahal ng
												sibuyas
											</p>
										</div>
										<div className="flex bg-gray-300 text-gray-500 p-2">
											<p className="pl-2">
												Posted By: Admin User
											</p>
											<p className="absolute right-16">
												120 Comments
											</p>
										</div>
									</div>
								</div>
								<div className="flex justify-center mt-2">
									<div className="rounded-sm shadow-lg bg-white w-11/12">
										<div className="flex bg-[#7F7EFF] py-2 rounded-sm">
											<div className="pl-2 text-white">
												Brand New Announcement
											</div>
											<div className="absolute right-16 text-white">
												30 minutes ago
											</div>
										</div>
										<img
											className="rounded-t-lg w-full p-2"
											src={Rectangle7}
											alt=""
										/>
										<div className="p-6">
											<p className="text-gray-700 text-base mb-4">
												Some quick example text to build
												on the card title and make up
												the bulk of the card's content.
												loren loren sinta buko ng papaya
												dalay dalay dusdos sisingalan ng
												tanga bakit walang buko lusot
												laparanang may hakdog ng iba
												bahay kubo kahit munti ang
												larangan doon ay sari sari
												singkamas at talong bawang at
												sibuyas na 700 pesos isang kilo
												kundol patola upot kalabasa at
												marami pang iba ang mahal ng
												sibuyas
											</p>
										</div>
										<div className="flex bg-gray-300 text-gray-500 p-2">
											<p className="pl-2">
												Posted By: Admin User
											</p>
											<p className="absolute right-16">
												120 Comments
											</p>
										</div>
									</div>
								</div>
							</>
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
				</>
			)}
		</div>
	);
};

export default UserProfilePage;
