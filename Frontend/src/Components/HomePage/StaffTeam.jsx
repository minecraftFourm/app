import React from "react";
import email from "../../assets/email.svg";
import github from "../../assets/github.svg";
import { SwiperSlide } from "swiper/react";

const StaffTeam = (props) => {
	const {
		role,
		bio,
		email: userEmail,
		username,
		profilePicture,
		github,
		showMail,
	} = props;
	console.log(props);
	return (
		<SwiperSlide>
			<section className="flex flex-row md:flex-col w-full h-full md:p-0 rounded-sm">
				<img
					src={profilePicture}
					alt=""
					className="object-contain md:object-cover md:max-w-none md:max-h-[200px] object-center max-w-[300px]"
				/>
				<div className="w-full text-white mt-3 flex gap-4 flex-col items-center h-full">
					<header className="text-center">
						<h4 className="font-semibold text-3xl capitalize">
							{username}
						</h4>
						<p
							className={`font-normal w-fit mx-auto px-2 bg-[${role.color}] text-xs`}>
							{role.title}
						</p>
					</header>
					<p className="px-6 mt-4 text-center font-light min-h-[128px] w-full">
						{bio ? bio : "No bio..."}
					</p>

					<footer className="flex flex-row gap-2 flex-wrap justify-between px-4">
						{/* <a
							href="https://www.github.com/ben"
							className="flex flex-row gap-2 items-center ">
							<img src={github} alt="" className="w-[24px]" />
							<p>{github}</p>
						</a> */}
						{email && showMail && (
							<a
								href={`mailto:${userEmail}`}
								className="flex flex-row gap-2 items-center">
								<img src={email} alt="" className="w-[24px]" />
								<p>{userEmail}</p>
							</a>
						)}
					</footer>
				</div>
			</section>
		</SwiperSlide>
	);
};

export default StaffTeam;
