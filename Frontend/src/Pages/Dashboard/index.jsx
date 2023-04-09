import React, { Suspense, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Announcements from "./Announcements";
import NewAnnouncement from "./NewPost";
import { UseUser } from "../../Contexts/UserContext";
import { LoadingIcon } from "../../Components/Icons";

const index = () => {
	const User = UseUser();
	const Navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!(User.role.isAdmin || User.role.isStaff)) {
			Navigate("/notfound", {
				replace: true,
			});
		}
		setIsLoading(false);
	}, []);

	return (
		<>
			{!isLoading ? (
				<div className="flex w-full h-screen">
					<aside className="w-[500px] bg-[#7F7EFF] h-screen">
						<div className="flex gap-1 flex-col p-1">
							<Link
								to="../dashboard"
								className="border-[#7675FF] bg-[#7F7EFF] px-2 py-1 border w-full h-full text-xl font-medium text-white">
								Home
							</Link>
							<p></p>
							<Link
								to="announcement"
								className="border-[#7675FF] bg-[#7F7EFF] px-2 py-1 border w-full h-full text-xl font-medium text-white">
								Announcement
							</Link>
						</div>
					</aside>
					<section className="w-full overflow-y-scroll">
						<Suspense>
							<Outlet />
						</Suspense>
					</section>
				</div>
			) : (
				<LoadingIcon color="#ffe" />
			)}
		</>
	);
};

export default index;
