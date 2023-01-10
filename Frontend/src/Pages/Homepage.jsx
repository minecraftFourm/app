import React, { useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useFetch } from "../Contexts/Fetch";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination , Autoplay} from "swiper";
import announcemnet1 from "../assets/announcement-1.jpg"
import announcement2 from "../assets/announcement-2.jpg"
import mainBg from "../assets/mainBg.jpg"
import 'react-lazy-load-image-component/src/effects/blur.css';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/keyboard";
import github from "../assets/github.svg"
import email from "../assets/email.svg"
import Scroll from "../Components/Scroll-to-top";
import StaffTeam from "../Components/StaffTeam";

const Homepage = () => {
	const CustomFetch = useFetch();
	const [ staffTeam, setStaffTeam ] = useState([]);

	useEffect(() => {
		(async() => {
			const { data, response } = await CustomFetch({ url: 'user?isStaff=t', returnResponse: true });
			if (response.ok) {
				setStaffTeam(data.data)
			}
		})()
	}, [])

	const Content = () => {
		return (
		<div className={`absolute top-0 z-0 bottom-0 left-0 right-0 grid place-items-center text-white bg-[#00000080] duration-1000`}>
			<h1 className={`font-extrabold text-6xl duration-700 opacity-100 z-10`}>ServerName</h1>
		</div>
		)
	}

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
					<Content />
				</SwiperSlide>
				<SwiperSlide className="">
					<img src={announcement2} alt="" className=" h-full w-full object-cover object-center"/>
					<Content />
				</SwiperSlide>
				<SwiperSlide>
					<img src="https://images.unsplash.com/photo-1607799632518-da91dd151b38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" 
						alt="" 
						className="w-full h-full object-cover object-center"/>
					<Content />
				</SwiperSlide>
			</Swiper>
			<p className="absolute z-10 px-4 py-3 bottom-0 bg-blue-800 text-white font-medium rounded-tr-md drop-shadow-md">30 Players Currently Online</p>

		</section>
		{/* TODO: Hero Content */}
		<section className="bg-[#1B263B] w-full h-full px-16 py-4">
			<div className="flex flex-row gap-8 justify-between w-full h-full">
				<div className="w-full bg-white p-6 flex flex-col gap-4">
					<div className="w-full border border-gray-400 bg-white rounded-sm overflow-hidden">
						<header className="w-full flex flex-row items-center justify-between bg-violet-500 text-white px-2 py-1">
							<h3 className="font-medium">Brand New Announcement</h3>
							<span className="font-light text-sm">30 minutes ago</span>
						</header>
						<section className="flex flex-col gap-4 p-2">
							<img src={announcemnet1} alt="" className="w-full h-full max-h-[26.875rem] object-cover object-center" />
							<p className="text-sm w-full h-full line-clamp-15">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium accusamus blanditiis beatae consequatur vel facilis exercitationem. Veritatis, commodi maxime deleniti at quidem perferendis ex eius! Magnam debitis sint quibusdam quam a nihil doloribus voluptas dicta porro ducimus fugiat iure odio non inventore ea corporis quia consequatur, facilis quod beatae provident nostrum voluptates. Dolor veritatis quidem eum beatae repudiandae praesentium, nisi perferendis officia dolorum laudantium quasi voluptates ullam aspernatur, numquam dignissimos magnam libero animi saepe deserunt ipsam totam. Nisi facilis aut tempora perspiciatis fuga beatae ad, in ipsum ipsa accusamus reiciendis impedit asperiores sit nesciunt quo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quasi, beatae, nobis excepturi doloribus nam consequatur molestiae necessitatibus, ut ratione expedita recusandae ipsa non dolorum cum? Quaerat harum veniam aliquid! Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium accusamus blanditiis beatae consequatur vel facilis exercitationem. Veritatis, commodi maxime deleniti at quidem perferendis ex eius! Magnam debitis sint quibusdam quam a nihil doloribus voluptas dicta porro ducimus fugiat iure odio non inventore ea corporis quia consequatur, facilis quod beatae provident nostrum voluptates. Dolor veritatis quidem eum beatae repudiandae praesentium, nisi perferendis</p>
						</section>
						<footer className="w-full flex flex-row justify-between items-center bg-gray-200 text-gray-700 px-2 py-2">
							<h6 className="text-sm">Posted by AdminUser</h6>
							<span className="text-sm font-light">126 Comments</span>
						</footer>
					</div>

					<div className="w-full border border-gray-400 bg-white rounded-sm overflow-hidden">
						<header className="w-full flex flex-row items-center justify-between bg-violet-500 text-white px-2 py-1">
							<h3 className="font-medium">Brand New Announcement</h3>
							<span className="font-light text-sm">30 minutes ago</span>
						</header>
						<section className="flex flex-col gap-4 p-2">
							<img src={announcement2} alt="" className="w-full h-full max-h-[26.875rem] object-cover object-center" />
							<p className="text-sm w-full h-full line-clamp-15">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium accusamus blanditiis beatae consequatur vel facilis exercitationem. Veritatis, commodi maxime deleniti at quidem perferendis ex eius! Magnam debitis sint quibusdam quam a nihil doloribus voluptas dicta porro ducimus fugiat iure odio non inventore ea corporis quia consequatur, facilis quod beatae provident nostrum voluptates. Dolor veritatis quidem eum beatae repudiandae praesentium, nisi perferendis officia dolorum laudantium quasi voluptates ullam aspernatur, numquam dignissimos magnam libero animi saepe deserunt ipsam totam. Nisi facilis aut tempora perspiciatis fuga beatae ad, in ipsum ipsa accusamus reiciendis impedit asperiores sit nesciunt quo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quasi, beatae, nobis excepturi doloribus nam consequatur molestiae necessitatibus, ut ratione expedita recusandae ipsa non dolorum cum? Quaerat harum veniam aliquid! Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium accusamus blanditiis beatae consequatur vel facilis exercitationem. Veritatis, commodi maxime deleniti at quidem perferendis ex eius! Magnam debitis sint quibusdam quam a nihil doloribus voluptas dicta porro ducimus fugiat iure odio non inventore ea corporis quia consequatur, facilis quod beatae provident nostrum voluptates. Dolor veritatis quidem eum beatae repudiandae praesentium, nisi perferendis</p>
						</section>
						<footer className="w-full flex flex-row justify-between items-center bg-gray-200 text-gray-700 px-2 py-2">
							<h6 className="text-sm">Posted by AdminUser</h6>
							<span className="text-sm font-light">126 Comments</span>
						</footer>
					</div>
					<div className="grid place-content-center">
						<button className="border px-4 py-1 bg-violet-500 border-violet-600 hover:bg-violet-700 duration-300 rounded-sm text-white">Read More...</button>
					</div>

				</div>
				<aside className="h-fit w-[450px] bg-white pt-6 pb-2 px-2 flex flex-col gap-4">
					<div className="w-full h-fit outline outline-1 pb-2 outline-gray-400">
						<p className="w-full bg-violet-500 text-white px-2 py-1 drop-shadow-lg">Recent Updates</p>
						<div className="flex flex-col gap-2 mt-2 px-1">

							<div className="flex flex-row gap-1 border border-violet-500 items-center px-2 py-1">
								<img src="https://s3-alpha-sig.figma.com/img/f3dc/fbab/27b77063d33ba61e27288b608bcaef4f?Expires=1672617600&Signature=MEumK8QiRYWpEfwYNzz0Bz-Rc374UwNf~4aF7cxS2IGQYWHu0otwd4jI5alLQSiWVF6Y8qKf8pkEURQ5kYmHGpjdqcblc1VLNzbKMw8H4cUEONm4v9gwYGpR9oklYKwpxvzJaE9VVK~iJ7SIH6J4jmVdWqlKsJeQLPVlZnSJcKeih3DVOJNG3aBdfSaSWGVUoSDAW9PStZU-yb-pL857Dm2cv11SJeA9r0NCxs3Ly5x5d1zPZSYwES75NU5--rhh3nlVjmInj7QmfShCc5M5ZuZs4PvwxIIgqMG8XZzEIUOhambW6Ulfr0Of~TgdGNzqqwXGAEIXu6ClKGcu1Gf6Iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="rounded-full h-[32px]" />
								<div className="w-full">
									<p className="line-clamp-1">Why are the pineapples moving?</p>
									<footer className="w-full flex flex-row justify-between">
										<p className="text-sm text-gray-500">adminUser2</p>
										<p className="text-sm text-gray-500">25 minutes ago</p>
									</footer>
								</div>
							</div>
							
							<div className="flex flex-row gap-1 border border-violet-500 items-center px-2 py-1">
								<img src="https://s3-alpha-sig.figma.com/img/f3dc/fbab/27b77063d33ba61e27288b608bcaef4f?Expires=1672617600&Signature=MEumK8QiRYWpEfwYNzz0Bz-Rc374UwNf~4aF7cxS2IGQYWHu0otwd4jI5alLQSiWVF6Y8qKf8pkEURQ5kYmHGpjdqcblc1VLNzbKMw8H4cUEONm4v9gwYGpR9oklYKwpxvzJaE9VVK~iJ7SIH6J4jmVdWqlKsJeQLPVlZnSJcKeih3DVOJNG3aBdfSaSWGVUoSDAW9PStZU-yb-pL857Dm2cv11SJeA9r0NCxs3Ly5x5d1zPZSYwES75NU5--rhh3nlVjmInj7QmfShCc5M5ZuZs4PvwxIIgqMG8XZzEIUOhambW6Ulfr0Of~TgdGNzqqwXGAEIXu6ClKGcu1Gf6Iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="rounded-full h-[32px]" />
								<div className="w-full">
									<p className="line-clamp-1">Why are the pineapples moving?</p>
									<footer className="w-full flex flex-row justify-between">
										<p className="text-sm text-gray-500">adminUser2</p>
										<p className="text-sm text-gray-500">25 minutes ago</p>
									</footer>
								</div>
							</div>

							<div className="flex flex-row gap-1 border border-violet-500 items-center px-2 py-1">
								<img src="https://s3-alpha-sig.figma.com/img/f3dc/fbab/27b77063d33ba61e27288b608bcaef4f?Expires=1672617600&Signature=MEumK8QiRYWpEfwYNzz0Bz-Rc374UwNf~4aF7cxS2IGQYWHu0otwd4jI5alLQSiWVF6Y8qKf8pkEURQ5kYmHGpjdqcblc1VLNzbKMw8H4cUEONm4v9gwYGpR9oklYKwpxvzJaE9VVK~iJ7SIH6J4jmVdWqlKsJeQLPVlZnSJcKeih3DVOJNG3aBdfSaSWGVUoSDAW9PStZU-yb-pL857Dm2cv11SJeA9r0NCxs3Ly5x5d1zPZSYwES75NU5--rhh3nlVjmInj7QmfShCc5M5ZuZs4PvwxIIgqMG8XZzEIUOhambW6Ulfr0Of~TgdGNzqqwXGAEIXu6ClKGcu1Gf6Iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="rounded-full h-[32px]" />
								<div className="w-full">
									<p className="line-clamp-1">Why are the pineapples moving?</p>
									<footer className="w-full flex flex-row justify-between">
										<p className="text-sm text-gray-500">adminUser2</p>
										<p className="text-sm text-gray-500">25 minutes ago</p>
									</footer>
								</div>
							</div>

							<div className="flex flex-row gap-1 border border-violet-500 items-center px-2 py-1">
								<img src="https://s3-alpha-sig.figma.com/img/f3dc/fbab/27b77063d33ba61e27288b608bcaef4f?Expires=1672617600&Signature=MEumK8QiRYWpEfwYNzz0Bz-Rc374UwNf~4aF7cxS2IGQYWHu0otwd4jI5alLQSiWVF6Y8qKf8pkEURQ5kYmHGpjdqcblc1VLNzbKMw8H4cUEONm4v9gwYGpR9oklYKwpxvzJaE9VVK~iJ7SIH6J4jmVdWqlKsJeQLPVlZnSJcKeih3DVOJNG3aBdfSaSWGVUoSDAW9PStZU-yb-pL857Dm2cv11SJeA9r0NCxs3Ly5x5d1zPZSYwES75NU5--rhh3nlVjmInj7QmfShCc5M5ZuZs4PvwxIIgqMG8XZzEIUOhambW6Ulfr0Of~TgdGNzqqwXGAEIXu6ClKGcu1Gf6Iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="rounded-full h-[32px]" />
								<div className="w-full">
									<p className="line-clamp-1">Why are the pineapples moving?</p>
									<footer className="w-full flex flex-row justify-between">
										<p className="text-sm text-gray-500">adminUser2</p>
										<p className="text-sm text-gray-500">25 minutes ago</p>
									</footer>
								</div>
							</div>
						</div>
					</div>

					<div className="w-full h-fit outline outline-1 pb-2 outline-gray-400">
						<p className="w-full bg-violet-500 text-white px-2 py-1 drop-shadow-lg">Top Posts</p>
						<div className="flex flex-col gap-2 mt-2 px-1">

							<div className="flex flex-row gap-1 border border-violet-500 items-center px-2 py-1">
								<img src="https://s3-alpha-sig.figma.com/img/f3dc/fbab/27b77063d33ba61e27288b608bcaef4f?Expires=1672617600&Signature=MEumK8QiRYWpEfwYNzz0Bz-Rc374UwNf~4aF7cxS2IGQYWHu0otwd4jI5alLQSiWVF6Y8qKf8pkEURQ5kYmHGpjdqcblc1VLNzbKMw8H4cUEONm4v9gwYGpR9oklYKwpxvzJaE9VVK~iJ7SIH6J4jmVdWqlKsJeQLPVlZnSJcKeih3DVOJNG3aBdfSaSWGVUoSDAW9PStZU-yb-pL857Dm2cv11SJeA9r0NCxs3Ly5x5d1zPZSYwES75NU5--rhh3nlVjmInj7QmfShCc5M5ZuZs4PvwxIIgqMG8XZzEIUOhambW6Ulfr0Of~TgdGNzqqwXGAEIXu6ClKGcu1Gf6Iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="rounded-full h-[32px]" />
								<div className="w-full">
									<p className="line-clamp-1">Why are the pineapples moving?</p>
									<footer className="w-full flex flex-row justify-between">
										<p className="text-sm text-gray-500">adminUser2</p>
										<p className="text-sm text-gray-500">25 minutes ago</p>
									</footer>
								</div>
							</div>
							
							<div className="flex flex-row gap-1 border border-violet-500 items-center px-2 py-1">
								<img src="https://s3-alpha-sig.figma.com/img/f3dc/fbab/27b77063d33ba61e27288b608bcaef4f?Expires=1672617600&Signature=MEumK8QiRYWpEfwYNzz0Bz-Rc374UwNf~4aF7cxS2IGQYWHu0otwd4jI5alLQSiWVF6Y8qKf8pkEURQ5kYmHGpjdqcblc1VLNzbKMw8H4cUEONm4v9gwYGpR9oklYKwpxvzJaE9VVK~iJ7SIH6J4jmVdWqlKsJeQLPVlZnSJcKeih3DVOJNG3aBdfSaSWGVUoSDAW9PStZU-yb-pL857Dm2cv11SJeA9r0NCxs3Ly5x5d1zPZSYwES75NU5--rhh3nlVjmInj7QmfShCc5M5ZuZs4PvwxIIgqMG8XZzEIUOhambW6Ulfr0Of~TgdGNzqqwXGAEIXu6ClKGcu1Gf6Iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="rounded-full h-[32px]" />
								<div className="w-full">
									<p className="line-clamp-1">Why are the pineapples moving?</p>
									<footer className="w-full flex flex-row justify-between">
										<p className="text-sm text-gray-500">adminUser2</p>
										<p className="text-sm text-gray-500">25 minutes ago</p>
									</footer>
								</div>
							</div>

							<div className="flex flex-row gap-1 border border-violet-500 items-center px-2 py-1">
								<img src="https://s3-alpha-sig.figma.com/img/f3dc/fbab/27b77063d33ba61e27288b608bcaef4f?Expires=1672617600&Signature=MEumK8QiRYWpEfwYNzz0Bz-Rc374UwNf~4aF7cxS2IGQYWHu0otwd4jI5alLQSiWVF6Y8qKf8pkEURQ5kYmHGpjdqcblc1VLNzbKMw8H4cUEONm4v9gwYGpR9oklYKwpxvzJaE9VVK~iJ7SIH6J4jmVdWqlKsJeQLPVlZnSJcKeih3DVOJNG3aBdfSaSWGVUoSDAW9PStZU-yb-pL857Dm2cv11SJeA9r0NCxs3Ly5x5d1zPZSYwES75NU5--rhh3nlVjmInj7QmfShCc5M5ZuZs4PvwxIIgqMG8XZzEIUOhambW6Ulfr0Of~TgdGNzqqwXGAEIXu6ClKGcu1Gf6Iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="rounded-full h-[32px]" />
								<div className="w-full">
									<p className="line-clamp-1">Why are the pineapples moving?</p>
									<footer className="w-full flex flex-row justify-between">
										<p className="text-sm text-gray-500">adminUser2</p>
										<p className="text-sm text-gray-500">25 minutes ago</p>
									</footer>
								</div>
							</div>

							<div className="flex flex-row gap-1 border border-violet-500 items-center px-2 py-1">
								<img src="https://s3-alpha-sig.figma.com/img/f3dc/fbab/27b77063d33ba61e27288b608bcaef4f?Expires=1672617600&Signature=MEumK8QiRYWpEfwYNzz0Bz-Rc374UwNf~4aF7cxS2IGQYWHu0otwd4jI5alLQSiWVF6Y8qKf8pkEURQ5kYmHGpjdqcblc1VLNzbKMw8H4cUEONm4v9gwYGpR9oklYKwpxvzJaE9VVK~iJ7SIH6J4jmVdWqlKsJeQLPVlZnSJcKeih3DVOJNG3aBdfSaSWGVUoSDAW9PStZU-yb-pL857Dm2cv11SJeA9r0NCxs3Ly5x5d1zPZSYwES75NU5--rhh3nlVjmInj7QmfShCc5M5ZuZs4PvwxIIgqMG8XZzEIUOhambW6Ulfr0Of~TgdGNzqqwXGAEIXu6ClKGcu1Gf6Iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="rounded-full h-[32px]" />
								<div className="w-full">
									<p className="line-clamp-1">Why are the pineapples moving?</p>
									<footer className="w-full flex flex-row justify-between">
										<p className="text-sm text-gray-500">adminUser2</p>
										<p className="text-sm text-gray-500">25 minutes ago</p>
									</footer>
								</div>
							</div>
						</div>
					</div>

					<div className="w-full h-fit outline outline-1 pb-2 outline-gray-400">
						<p className="w-full bg-violet-500 text-white px-2 py-1 drop-shadow-lg">Top Likes</p>
						<div className="flex flex-col gap-2 mt-2 px-1">

							<div className="flex flex-row gap-1 border border-violet-500 items-center px-2 py-1">
								<img src="https://s3-alpha-sig.figma.com/img/f3dc/fbab/27b77063d33ba61e27288b608bcaef4f?Expires=1672617600&Signature=MEumK8QiRYWpEfwYNzz0Bz-Rc374UwNf~4aF7cxS2IGQYWHu0otwd4jI5alLQSiWVF6Y8qKf8pkEURQ5kYmHGpjdqcblc1VLNzbKMw8H4cUEONm4v9gwYGpR9oklYKwpxvzJaE9VVK~iJ7SIH6J4jmVdWqlKsJeQLPVlZnSJcKeih3DVOJNG3aBdfSaSWGVUoSDAW9PStZU-yb-pL857Dm2cv11SJeA9r0NCxs3Ly5x5d1zPZSYwES75NU5--rhh3nlVjmInj7QmfShCc5M5ZuZs4PvwxIIgqMG8XZzEIUOhambW6Ulfr0Of~TgdGNzqqwXGAEIXu6ClKGcu1Gf6Iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="rounded-full h-[32px]" />
								<div className="w-full">
									<p className="line-clamp-1">Why are the pineapples moving?</p>
									<footer className="w-full flex flex-row justify-between">
										<p className="text-sm text-gray-500">adminUser2</p>
										<p className="text-sm text-gray-500">25 minutes ago</p>
									</footer>
								</div>
							</div>
							
							<div className="flex flex-row gap-1 border border-violet-500 items-center px-2 py-1">
								<img src="https://s3-alpha-sig.figma.com/img/f3dc/fbab/27b77063d33ba61e27288b608bcaef4f?Expires=1672617600&Signature=MEumK8QiRYWpEfwYNzz0Bz-Rc374UwNf~4aF7cxS2IGQYWHu0otwd4jI5alLQSiWVF6Y8qKf8pkEURQ5kYmHGpjdqcblc1VLNzbKMw8H4cUEONm4v9gwYGpR9oklYKwpxvzJaE9VVK~iJ7SIH6J4jmVdWqlKsJeQLPVlZnSJcKeih3DVOJNG3aBdfSaSWGVUoSDAW9PStZU-yb-pL857Dm2cv11SJeA9r0NCxs3Ly5x5d1zPZSYwES75NU5--rhh3nlVjmInj7QmfShCc5M5ZuZs4PvwxIIgqMG8XZzEIUOhambW6Ulfr0Of~TgdGNzqqwXGAEIXu6ClKGcu1Gf6Iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="rounded-full h-[32px]" />
								<div className="w-full">
									<p className="line-clamp-1">Why are the pineapples moving?</p>
									<footer className="w-full flex flex-row justify-between">
										<p className="text-sm text-gray-500">adminUser2</p>
										<p className="text-sm text-gray-500">25 minutes ago</p>
									</footer>
								</div>
							</div>

							<div className="flex flex-row gap-1 border border-violet-500 items-center px-2 py-1">
								<img src="https://s3-alpha-sig.figma.com/img/f3dc/fbab/27b77063d33ba61e27288b608bcaef4f?Expires=1672617600&Signature=MEumK8QiRYWpEfwYNzz0Bz-Rc374UwNf~4aF7cxS2IGQYWHu0otwd4jI5alLQSiWVF6Y8qKf8pkEURQ5kYmHGpjdqcblc1VLNzbKMw8H4cUEONm4v9gwYGpR9oklYKwpxvzJaE9VVK~iJ7SIH6J4jmVdWqlKsJeQLPVlZnSJcKeih3DVOJNG3aBdfSaSWGVUoSDAW9PStZU-yb-pL857Dm2cv11SJeA9r0NCxs3Ly5x5d1zPZSYwES75NU5--rhh3nlVjmInj7QmfShCc5M5ZuZs4PvwxIIgqMG8XZzEIUOhambW6Ulfr0Of~TgdGNzqqwXGAEIXu6ClKGcu1Gf6Iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="rounded-full h-[32px]" />
								<div className="w-full">
									<p className="line-clamp-1">Why are the pineapples moving?</p>
									<footer className="w-full flex flex-row justify-between">
										<p className="text-sm text-gray-500">adminUser2</p>
										<p className="text-sm text-gray-500">25 minutes ago</p>
									</footer>
								</div>
							</div>

							<div className="flex flex-row gap-1 border border-violet-500 items-center px-2 py-1">
								<img src="https://s3-alpha-sig.figma.com/img/f3dc/fbab/27b77063d33ba61e27288b608bcaef4f?Expires=1672617600&Signature=MEumK8QiRYWpEfwYNzz0Bz-Rc374UwNf~4aF7cxS2IGQYWHu0otwd4jI5alLQSiWVF6Y8qKf8pkEURQ5kYmHGpjdqcblc1VLNzbKMw8H4cUEONm4v9gwYGpR9oklYKwpxvzJaE9VVK~iJ7SIH6J4jmVdWqlKsJeQLPVlZnSJcKeih3DVOJNG3aBdfSaSWGVUoSDAW9PStZU-yb-pL857Dm2cv11SJeA9r0NCxs3Ly5x5d1zPZSYwES75NU5--rhh3nlVjmInj7QmfShCc5M5ZuZs4PvwxIIgqMG8XZzEIUOhambW6Ulfr0Of~TgdGNzqqwXGAEIXu6ClKGcu1Gf6Iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="rounded-full h-[32px]" />
								<div className="w-full">
									<p className="line-clamp-1">Why are the pineapples moving?</p>
									<footer className="w-full flex flex-row justify-between">
										<p className="text-sm text-gray-500">adminUser2</p>
										<p className="text-sm text-gray-500">25 minutes ago</p>
									</footer>
								</div>
							</div>
						</div>
					</div>
				</aside>
			</div>
			{ staffTeam.length === 0 && <Scroll /> }
		</section>

		{/* Our Team */}
		{
			staffTeam.length !== 0 
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
								delay: 2500,
								disableOnInteraction: false,
							}}
						>
							{staffTeam.map(item => {
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
				<Scroll /> 
			</>
		}
	</>
  )
	}
export default Homepage;