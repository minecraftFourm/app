import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-blue-900 min-h-[150px]">
			<section className="bg-[#0D1B2A] text-white px-4 pb-4 justify-between w-full flex md:flex-col gap-24">
				<div className="px-6 py-8">
					<h4 className="text-3xl underline font-medium pb-2">
						About Us
					</h4>
					<p className="font-light w-full">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Velit recusandae laudantium error quia sit omnis, non
						modi est voluptatum. Voluptates, eius ut nisi
						perferendis a quis. Facere neque labore cupiditate aut
						dolor nemo quos cumque molestias eius ab dolorem
						consequatur eum officiis quasi, vel rerum quae ducimus
						doloremque, harum officia id, libero autem non fuga.
						Saepe atque officiis modi at ipsam labore aperiam
						voluptatem qui impedit veniam quisquam beatae ratione ab
						incidunt voluptates, quis optio aliquam odio, minima
						illo mollitia? Itaque, numquam hic doloribus mollitia
						quibusdam quo optio nostrum temporibus dolore
						necessitatibus id ex labore. Harum sapiente rem ducimus
						architecto asperiores in. Id ducimus pariatur
						praesentium, necessitatibus error eum repellat ipsum
						nemo illo officia, enim quod quos non sed quidem rem
						autem laudantium voluptatem amet porro neque minima
						cupiditate. Dolor maxime eum itaque exercitationem. Sed
						dicta sint eius quam dolores excepturi exercitationem.
					</p>
				</div>

				<div className="bg-[#1B263B] px-4 min-w-[250px] py-4">
					<h4 className="font-semibold underline text-xl">
						Useful Links
					</h4>
					<section className="flex flex-col gap-2 mt-4">
						<div className="w-full">
							<Link to={"/"} className="font-light">
								Home
							</Link>
							<div className="bg-slate-600 w-full h-[1px]"></div>
						</div>

						<div className="w-full">
							<Link to={"/"} className="font-light">
								Fourm
							</Link>
							<div className="bg-slate-600 w-full h-[1px]"></div>
						</div>

						<div className="w-full">
							<Link to={"/"} className="font-light">
								Games
							</Link>
							<div className="bg-slate-600 w-full h-[1px]"></div>
						</div>
					</section>
				</div>
			</section>
		</footer>
	);
};

export default Footer;
