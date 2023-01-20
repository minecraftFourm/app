import React, { useEffect, useState } from "react";
import { useFetch } from "../Contexts/Fetch";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination , Autoplay} from "swiper";
import announcement2 from "../assets/announcement-2.jpg"
import mainBg from "../assets/mainBg.jpg"
import 'react-lazy-load-image-component/src/effects/blur.css';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/keyboard";
import Scroll from "../Components/Scroll-to-top";
import StaffTeam from "../Components/HomePage/StaffTeam";
import Announcement from "../Components/HomePage/Announcement";
import RecentPosts from "../Components/HomePage/recentPosts";
import RecentComments from "../Components/HomePage/RecentComments";
import RecentUsers from "../Components/HomePage/RecentUsers";
import { LoadingIcon } from "../Components/Icons";
import Overlay from "../Components/Overlay";

const Homepage = () => {
	const CustomFetch = useFetch();
	const [data, setData] = useState({
		recentUpdates: [],
		recentComments: [],
		recentUsers: [],
		announcement: [],
		staffTeam: []
	})
	const [ isLoading, setIsLoading ] = useState(true)
	const [ err, setErr ] = useState()

	useEffect(() => {
		(async() => {
			
			// *Fetches announcements, staff list, recent comments, recent users, and recently updated posts from the backend.
			let { data: announcementData, response: announcementResponse } = await CustomFetch({ url: 'post?category=announcement&limit=6', returnResponse: true });
			let { data: staffData, response: staffResponse } = await CustomFetch({ url: 'user?isStaff=t', returnResponse: true });
			let { data: recentlyUpdatedData, response: recentlyUpdatedResponse } = await CustomFetch({ url: 'post?limit=5', returnResponse: true })
			let { data: recentComments, response: recentCommentsResponse } = await CustomFetch({ url: 'comment?limit=5&sort=desc', returnResponse: true })
			let { data: recentUsers, response: recentUsersResponse } = await CustomFetch({ url: 'user?limit=5', returnResponse: true })
			
			setData(prevValue => {
				return {
					recentComments: recentComments.data,
					recentUsers: recentUsers.data,
					recentUpdates: recentlyUpdatedData.data,
					announcement: announcementData.data,
					staff: staffData.data
				}
			})
			setIsLoading(false)
			// TODO: handle erros
		})()
	}, [])

  return (
	<>
		<section className="relative">
			<Swiper
				pagination={{
				dynamicBullets: true,
				}}
				slidesPerView={1}
				loop={true}
				modules={[Pagination, Keyboard]}
				className="h-[700px]"
			>
				<SwiperSlide className="w-full h-full">
					<img src={mainBg} alt="" className=" h-full w-full object-cover object-center" />
					<Overlay />
				</SwiperSlide>
				<SwiperSlide className="">
					<img src={announcement2} alt="" className=" h-full w-full object-cover object-center"/>
					<Overlay />
				</SwiperSlide>
				<SwiperSlide>
					<img src="https://images.unsplash.com/photo-1607799632518-da91dd151b38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" 
						alt="" 
						className="w-full h-full object-cover object-center"/>
					<Overlay />
				</SwiperSlide>
			</Swiper>
			<p className="absolute z-10 px-4 py-3 bottom-0 bg-blue-800 text-white font-medium rounded-tr-md drop-shadow-md">30 Players Currently Online</p>

		</section>
		{/* TODO: Hero Content */}
		<section className="bg-[#1B263B] w-full h-full px-16 py-4 pb-16">
			{ isLoading && <LoadingIcon /> }
			{!isLoading && 
				<div className="flex flex-row gap-8 justify-between w-full h-full">
					<div className="w-full bg-white p-4 flex flex-col gap-4">
						
						{
							data.announcement && data.announcement.map(item => {
								return (
									<div key={item.id}>
										<Announcement
											{...item}
										/>	
									</div>
									)
								}
						)}	

						{
							data.announcement.length === 0 && <p className="text-center text-gray-600">There are currently no announcements...</p>
						}


						{ 
							data.announcement > 5 && 
							<div className="grid place-content-center">
								<button className="border px-4 py-1 bg-violet-500 border-violet-600 hover:bg-violet-700 duration-300 rounded-sm text-white justify-self-end">Read More...</button>
							</div>
						}


					</div>
					<aside className="h-fit w-[450px] bg-white p-4 flex flex-col gap-4">
						<div className="w-full h-fit outline outline-1 pb-2 outline-gray-400 shadow-md">
							<p className="w-full bg-violet-500 text-white px-2 py-1 ">Recent Updates</p>
							<div className="flex flex-col gap-2 mt-2 px-1 min-h-[300px]">

								{ 
									data.recentUpdates.length != 0 &&
										data.recentUpdates.map(item => {
											return (
												<div key={item.id}>
													<RecentPosts 
															{...item}
														/>	
												</div>	
											)
										})
								}
								
								{
									data.recentUpdates.length === 0 && 
									<p className="text-center text-sm text-gray-600">There are currently no recent updates.</p>
								}

							</div>
						</div>

						<div className="w-full h-fit outline outline-1 pb-2 outline-gray-400">
							<p className="w-full bg-violet-500 text-white px-2 py-1 drop-shadow-lg">Recent Comments</p>
							<div className="flex flex-col gap-2 mt-2 px-1 min-h-[300px]">

								{
									data.recentComments.length != 0 && 
										<RecentComments 
											items = {data.recentComments}
										/>
								}

								{
									data.recentComments.length === 0 && 
									<p className="text-center text-sm text-gray-600">There are currently no recent comments.</p>
								}

							</div>
						</div>

						<div className="w-full h-fit outline outline-1 pb-2 outline-gray-400">
							<p className="w-full bg-violet-500 text-white px-2 py-1 drop-shadow-lg">Recent Users</p>
							<div className="flex flex-col gap-2 mt-2 px-1 min-h-[300px]">

								{
									data.recentUsers.length != 0 && 
										<RecentUsers 
											items = {data.recentUsers}
										/>
								}
								
								{
									data.recentUsers.length === 0 && 
									<p className="text-center text-sm text-gray-600">There are currently no recent users.</p>
								}

							</div>
						</div>
					</aside>
				</div>
			}
		</section>

		{/* Our Team */}
		{
			(data.staff && data.staff.length !== 0)  
			&& 
			<>
				<section className="bg-white py-12">
					<div className="w-full text-center">
						<h2 className="text-gray-700 font-bold text-4xl">Our Team Members</h2>
						<p className="text-gray-500">Meet our team</p>
					</div>

					{/* TODO: Button controllers */}
					<article className="mt-4 bg-indigo-500 mx-auto border border-slate-500 drop-shadow-lg max-w-[900px] h-[300px]">
						<Swiper
							slidesPerView={1}
							loop={true}
							modules={[Autoplay, Pagination, Keyboard]}
							className="h-full"
							autoplay={{
								delay: 5000,
								disableOnInteraction: false,
							}}
						>
							{data.staff.map(item => {
								return (
									<SwiperSlide key={item.id}>
										<StaffTeam
											{...item}
										/>
									</SwiperSlide>
								)
							})}	
						</Swiper>
					</article>
				</section> 
				{!isLoading && <Scroll /> }
			</>
		}
	</>
  )}

export default Homepage