import React, { useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useFetch } from "../Contexts/Fetch";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination } from "swiper";
import announcemnet1 from "../assets/announcement-1.jpg"
import announcement2 from "../assets/announcement-2.jpg"
import mainBg from "../assets/mainBg.jpg"
import 'react-lazy-load-image-component/src/effects/blur.css';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/keyboard";

const Homepage = () => {
	const CustomFetch = useFetch();

	const f = async () => {
		const data = await CustomFetch({ url: 'protected' });
	}

	const [ showTitle, setShowTitle ] = useState(false);

	const Content = () => {
		return (
		<div className={`absolute top-0 z-0 bottom-0 left-0 right-0 grid place-items-center text-white bg-[#00000080] duration-1000`}>
			<h1 className={`font-extrabold text-6xl duration-700 opacity-100 z-10`} onClick={f}>ServerName</h1>
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
				modules={[Pagination, Keyboard]}
				className="h-[700px]"
			>
				<SwiperSlide className="">
					{/* <LazyLoadImage
						alt='Website Hero Background'
						src={mainBg} // use normal <img> attributes as props
						afterLoad={() => setShowTitle(true)}
						effect="blur"
						className="max-h-[500px] h-full w-full"
					/> */}
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
		<section className="bg-[#1B263B] w-full h-full px-16 py-4 -mt-2">
			<div className="flex flex-row gap-8 justify-between w-full h-full">
				<div className="w-full bg-white p-6 flex flex-col gap-4">
					<div className="w-full border border-gray-400 bg-white rounded-lg overflow-hidden">
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

					<div className="w-full border border-gray-400 bg-white rounded-lg overflow-hidden">
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

				</div>
				<aside className="h-[800px] w-96 bg-white p-6 hidden md:block">
					<div className="bg-gray-500 w-full h-full">

					</div>
				</aside>
			</div>
		</section>

		{/* Our Team */}
		<section className="bg-white">
			<div className="w-full text-center mt-12">
				<h2 className="text-gray-700 font-bold text-4xl">Our Team Members</h2>
				<p className="text-gray-500">Meet our team</p>
			</div>

			<article className="flex flex-row  mx-auto mt-4 bg-indigo-500 border border-slate-500 drop-shadow-lg max-w-[900px] h-[300px]">
				<img src="https://s3-alpha-sig.figma.com/img/2bf0/38b2/24b6fd21fbe783bc14937744f3e9a9cc?Expires=1672617600&Signature=NvublJObKVhmjMBxLObHUbRHEagUU~qUA3lyoSCgO1otPB~h5IFEU125~tAh~48DYX4LOdYFwTzVSBk724hreypVr1R1P6DOgDMpWQUiYswZ9g5V93slEbdE6aalP3d0AwrL-svT8xXmfI6EkDaEu6THoUUN3p8ZCeg5pLiR07CPvHxmU8KVONl-ssv-LqDEpXODba8-I3nHJIUf-1KTNZNvf~FuaKbTyAJzscPKeq6zypywTo-kpcoW0npW7r5y6SSsDEOzRa1-bbrzWny5lWVQMJbDbLxs65p0jJotsYBd9B70mo368I-4CjB7S9NPjFEMBYiciu7p~Sx21AwIIQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" className="object-cover object-center max-w-[300px] w-full" />
				<div className="w-full text-white mt-3 flex flex-col items-center relative">
					<header className="text-center">
						<h4 className="font-semibold text-3xl">Dave Chappel</h4>
						<p className="font-normal">Plugin Developer</p>
					</header>
					<p className="px-6 mt-2 text-center font-light">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem a esse totam aspernatur, maiores porro non architecto voluptatibus consequuntur consequatur excepturi iure voluptate, velit ex, consectetur ad sit molestiae expedita.</p>
					<footer className="flex flex-row justify-between px-4 gap-2 absolute bottom-2">
						<p>github.com/davechappel</p>
						<p>davechappel@example.com</p>
						{/* TODO: Icons */}
					</footer>
				</div>
			</article>
		</section>

					<p className="mb-4"></p>
	</>
  )
	}
export default Homepage;
