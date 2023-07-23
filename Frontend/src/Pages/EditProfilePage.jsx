import React, { useEffect, useState } from "react";
import bgprofile from "../assets/bgprofile.png";
import pretty from "../assets/pretty.png";
import { UseUser } from "../Contexts/UserContext";
import { useFetch } from "../Contexts/Fetch";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const EditProfilePage = (props) => {
	const {
		updateTab,
		userDetails,
		updatePage: fetchData,
		profileOwner,
	} = props;
	const User = UseUser();
	const CustomFetch = useFetch();
	const Navigate = useNavigate();
	const [bannerList, setBannerList] = useState([]);
	const [user, setUser] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState({
		username: "",
		email: "",
		bio: "",
		discord: "",
		instagram: "",
		mc_username: "",
		showMail: "",
		banner: "",
		// profilePicture: "",
	});

	const fetchUserData = async () => {
		const { response, data } = await CustomFetch({
			url: `user/${profileOwner}`,
			returnResponse: true,
		});

		if (!response.ok) {
			Navigate("/notfound");
		}

		setData(() => {
			return {
				username: data.data.username,
				email: data.data.email,
				bio: data.data.bio,
				discord: data.data.discord,
				instagram: data.data.instagram,
				mc_username: data.data.mc_username,
				showMail: data.data.showMail,
				profilePicture: data.data.profilePicture,
				banner: data.data.banner.url,
				bannerId: data.data.banner.id,
			};
		});

		setUser(data.data);
		setIsLoading(false);
	};

	useEffect(() => {
		(async () => {
			await fetchUserData();
		})();
	}, []);

	const updateData = (newData) => {
		setData((currentData) => {
			return {
				...currentData,
				...newData,
			};
		});
	};

	const Save = () => {
		const SaveRequest = CustomFetch({
			url: `user/${User.id}`,
			options: {
				body: JSON.stringify(data),
				method: "PATCH",
			},
			returnPromise: true,
		});

		toast.promise(SaveRequest, {
			loading: "Saving data...",
			success: (response) => {
				if (!response.ok) throw new Error();
				// Scrolls back to the top of the page.
				scrollTo(0, 0);
				updateTab();
				return "Sucessfully saved your profile!";
			},
			error: (err) => {
				console.log(err);
				return "An error occured save your new profile details!";
			},
		});
	};

	useEffect(() => {
		(async () => {
			const { response, data } = await CustomFetch({
				url: "banner",
				returnResponse: true,
			});

			if (!response.ok) return;
			// ! handle error
			setBannerList(data.data);
		})();
	}, []);

	const updateBanner = async (bannerId) => {
		const Request = CustomFetch({
			url: `user/${User.id}`,
			options: {
				method: "PATCH",
				body: JSON.stringify({
					bannerId: bannerId,
				}),
			},
			returnPromise: true,
		});

		toast.promise(Request, {
			loading: "Updating banner...",
			success: (data) => {
				(async () => {
					await fetchData();
					await fetchUserData();
					// TODO: Getting user's data from the main profile page.
				})();
				return `Sucessfully updated banner!`;
			},
			error: (err) => {
				console.log(err);
				return `An error occured while trying to update your banner!`;
			},
		});
	};

	return (
		<>
			{!isLoading && (
				<div className="bg-white">
					<div className="h-[500px] grid place-content-center relative">
						<div className="bg-red-400 w-full h-[200px] fixed m-4 z-50">
							One
						</div>
						<div className="absolute bg-transparent grid place-content-center z-20 top-0 bottom-0 left-0 right-0">
							<div className="w-[250px] h-[250px] rounded-full hover:cursor-pointer">
								<div className="absolute top-0 right-0 p-2 flex flex-row gap-1">
									{/* Need to change the banner list to data pulled from DB - currently saved on FE */}
									{User.isAuthenticated &&
										(User.id === user.id ||
											User.role.isAdmin) &&
										bannerList?.map((item) => {
											const { id, url } = item;
											return (
												<img
													key={id}
													src={url}
													onClick={() =>
														updateBanner(id)
													}
													className="w-[32px] h-[32px] cursor-pointer border border-gray-500"
												/>
											);
										})}
								</div>
								<img
									src={userDetails.profilePicture}
									alt=""
									className="rounded-full object-cover w-full h-full"
								/>
							</div>
						</div>
						<img
							src={user.banner.url}
							alt={user.banner.name}
							className="absolute w-full h-full cursor-pointer object-cover"
							onClick={() => console.log("Banner")}
						/>
						<img
							src={user.profilePicture}
							alr={`${user.username}'s profile picture.`}
							className="mx-auto h-52 w-52 border-black border-2 z-10 cursor-pointer object-cover rounded-full"
							onClick={() => console.log("Profile Picture")}
						/>
					</div>
					<div className="grid grid-cols-1 py-3">
						<label className="font-bold text-slate-700 text-xl px-6 my-2">
							Username:
							<div>
								<input
									type="text"
									className="px-2 py-1 w-11/12 text-base font-light"
									placeholder={user.username}
									value={data.username}
									onChange={(e) =>
										updateData({ username: e.target.value })
									}
								/>
							</div>
						</label>
						<label className="font-bold text-slate-700 text-xl px-6 my-2">
							Email:
							<div>
								<input
									type="text"
									className="px-2 py-1 w-11/12 text-base font-light"
									placeholder={user.email}
									value={data.email}
									onChange={(e) => {
										updateData({ email: e.target.value });
									}}
								/>
							</div>
						</label>
						<label className="font-bold text-slate-700 text-xl px-6 my-2">
							Bio:
							<div>
								<textarea
									className="px-2 w-11/12 text-base font-light py-1 h-[150px] border-black border-solid border-[1px]"
									placeholder={user.bio}
									value={data.bio}
									onChange={(e) => {
										updateData({ bio: e.target.value });
									}}
								/>
							</div>
						</label>
						<label className="font-bold text-slate-700 text-xl px-6 my-2">
							Instagram:
							<div>
								<input
									type="text"
									className="w-11/12 text-base px-2 py-1 font-light"
									placeholder={user.instagram}
									value={data.instagram}
									onChange={(e) => {
										updateData({
											instagram: e.target.value,
										});
									}}
								/>
							</div>
						</label>
						<label className="font-bold text-slate-700 text-xl px-6 my-2">
							Discord:
							<div>
								<input
									type="text"
									className="w-11/12 text-base px-2 py-1 font-light"
									placeholder={user.discord}
									value={data.discord}
									onChange={(e) => {
										updateData({ discord: e.target.value });
									}}
								/>
							</div>
						</label>
						<label className="font-bold text-slate-700 text-xl px-6 my-2">
							Minecraft Username:
							<div>
								<input
									type="text"
									className="w-11/12 text-base px-2 py-1 font-light"
									placeholder={user.mc_username}
									value={data.mc_username}
									onChange={(e) => {
										updateData({
											mc_username: e.target.value,
										});
									}}
								/>
							</div>
						</label>
						<label className="font-bold text-slate-700 text-xl px-6 my-2">
							Show Email:
							{/* TODO: Fix the default checked value */}
							{!data.showMail && (
								<input
									type="checkbox"
									className="ml-2 w-4 h-4"
									id="checkbox"
									onChange={(e) => {
										updateData({
											showMail: `${e.target.checked}`,
										});
									}}
								/>
							)}
							{data.showMail && (
								<input
									defaultChecked
									type="checkbox"
									className="ml-2 w-4 h-4"
									id="checkbox"
									onChange={(e) => {
										updateData({
											showMail: `${e.target.checked}`,
										});
									}}
								/>
							)}
						</label>
						<div className="justify-center w-full flex">
							<button
								className="hover:bg-indigo-700 cursor-pointer bg-indigo-500 text-white py-1 px-6 border border-indigo-600 transition-colors duration-300 rounded"
								type="submit"
								onClick={Save}>
								Save
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default EditProfilePage;
