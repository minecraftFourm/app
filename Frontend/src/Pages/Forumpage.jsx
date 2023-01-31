import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ForumHeader from "../Components/ForumHeader";
import { useFetch } from "../Contexts/Fetch";

const Forumpage = () => {
	const CustomFetch = useFetch();

	useEffect(() => {
		(async () => {
			const { data, response } = await CustomFetch({
				url: "category",
				returnResponse: true,
			});
			console.log(data);
		})();
	}, []);
	return (
		<div className="pb-32 bg-[#1B263B] ">
			{/* Hero */}
			<ForumHeader />

			{/* Forum */}
			<div className="w-full h-[1200px] pt-16 flex px-16 py-4 gap-8">
				<section className="w-full bg-white h-full px-4 py-6 flex flex-col gap-6">
					<section className="w-full h-fit border border-slate-400 rounded-md overflow-hidden bg-violet-500">
						<div className="bg-white px-2 py-2">
							<h3 className="font-semibold text-lg">
								Official Updates
							</h3>
							<p className="text-sm">
								Official news, announcements, and information
								posted by `ServerName` Administrators regarding
								the network
							</p>
						</div>
						<section className="py-4 px-2 flex flex-col gap-2">
							<div className="w-full flex flex-row justify-between bg-white p-2 items-center rounded-md cursor-pointer">
								<div className="flex gap-4 items-center flex-row">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="text-violet-500 w-8 h-8">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
										/>
									</svg>
									<h4 className="font-medium">
										News & Announcement
									</h4>
								</div>
								<div className="flex flex-row justify-between gap-8 items-center">
									<div className="flex flex-col items-center">
										<h5 className="text-violet-500">
											Posts
										</h5>
										<p className="font-semibold">100</p>
									</div>
									<div className="flex flex-col items-center">
										<h5 className="text-violet-500">
											Messages
										</h5>
										<p className="font-semibold">1.3k</p>
									</div>
								</div>
							</div>

							<div className="w-full flex flex-row justify-between bg-white p-2 items-center rounded-md cursor-pointer">
								<div className="flex gap-4 items-center flex-row">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="text-violet-500 w-8 h-8">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
										/>
									</svg>

									<h4 className="font-medium">
										Moderation Information and Changes
									</h4>
								</div>
								<div className="flex flex-row justify-between gap-8 items-center">
									<div className="flex flex-col items-center">
										<h5 className="text-violet-500">
											Posts
										</h5>
										<p className="font-semibold">100</p>
									</div>
									<div className="flex flex-col items-center">
										<h5 className="text-violet-500">
											Messages
										</h5>
										<p className="font-semibold">1.3k</p>
									</div>
								</div>
							</div>
						</section>
					</section>

					{/*  */}

					<section className="w-full h-fit border border-slate-400 rounded-md overflow-hidden bg-violet-500">
						<div className="bg-white px-2 py-2">
							<h3 className="font-semibold text-lg">
								`ServerName` Community
							</h3>
							<p className="text-sm">
								Check out all the other forum sections dedicated
								to community creations, events, and
								non-`serverName` related discussions!
							</p>
						</div>
						<section className="py-4 px-2 flex flex-col gap-2">
							<div className="w-full flex flex-row justify-between bg-white p-2 items-center rounded-md cursor-pointer">
								<div className="flex gap-4 items-center flex-row">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="text-violet-500 w-8 h-8">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
										/>
									</svg>

									<h4 className="font-medium">
										Introduce yourself
									</h4>
								</div>
								<div className="flex flex-row justify-between gap-8 items-center">
									<div className="flex flex-col items-center">
										<h5 className="text-violet-500">
											Posts
										</h5>
										<p className="font-semibold">100</p>
									</div>
									<div className="flex flex-col items-center">
										<h5 className="text-violet-500">
											Messages
										</h5>
										<p className="font-semibold">1.3k</p>
									</div>
								</div>
							</div>

							<div className="w-full flex flex-row justify-between bg-white p-2 items-center rounded-md cursor-pointer">
								<div className="flex gap-4 items-center flex-row">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="text-violet-500 w-8 h-8">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
										/>
									</svg>

									<h4 className="font-medium">
										`ServerName` Events
									</h4>
								</div>
								<div className="flex flex-row justify-between gap-8 items-center">
									<div className="flex flex-col items-center">
										<h5 className="text-violet-500">
											Posts
										</h5>
										<p className="font-semibold">100</p>
									</div>
									<div className="flex flex-col items-center">
										<h5 className="text-violet-500">
											Messages
										</h5>
										<p className="font-semibold">1.3k</p>
									</div>
								</div>
							</div>
						</section>
					</section>
				</section>
				<aside className="h-[900px] w-[450px] bg-white pt-6 pb-2 px-2 flex flex-col gap-4"></aside>
			</div>
		</div>
	);
};

export default Forumpage;
