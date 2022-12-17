import React, { useState } from "react";
import announcemnet1 from "../assets/announcement-1.jpg"
import announcement2 from "../assets/announcement-2.jpg"
import mainBg from "../assets/mainBg.jpg"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { API_URL } from "../config";

const Homepage = () => {
	const f = async () => {
		const response = await fetch(`${API_URL}/protected`, {
			credentials: 'include',
			headers: {
                'Content-Type': 'application/json'
            },
		})
		console.log(await response.json())
	}
	const [ showTitle, setShowTitle ] = useState(false);

	
  return (
	<>
		<section className="relative">
			<LazyLoadImage
				alt='Website Hero Background'
				src={mainBg} // use normal <img> attributes as props
				afterLoad={() => setShowTitle(true)}
				effect="blur"
			/>
			<div className={`absolute top-0 bottom-0 left-0 right-0 grid place-items-center text-white bg-[#00000080] duration-1000 ${showTitle ? 'opacity-100' : 'opacity-0'}`}>
				<h1 className={`font-extrabold text-6xl duration-700 ${showTitle ? 'opacity-100' : 'opacity-0'}`} onClick={f}>ServerName</h1>
			</div>

		</section>
		{/* TODO: Hero Content */}
		<div className="bg-[#1B263B] w-full h-full px-16 py-4">
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
				<div className="h-[800px] w-96 bg-white p-6 hidden md:block">
					<div className="bg-gray-500 w-full h-full">

					</div>
				</div>
			</div>
		</div>
	</>
  )
	}
export default Homepage;
