import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const RecentUsers = (props) => {
	const items = props.items;
	const Component = () => {
		return items.map((item) => {
			const {
				username,
				role: { title, color },
				profilePicture,
				id,
				created,
			} = item;

			return (
				<div
					className="flex flex-row gap-1 border border-violet-500 items-center px-2 py-1"
					key={id}>
					<img
						src={profilePicture}
						className="rounded-full h-[32px] w-[32px]"
					/>
					<div className="w-full">
						<Link
							to={`./user/${id}`}
							className="line-clamp-1 capitalize">
							{username}
						</Link>
						<footer className="w-full flex flex-row justify-between">
							<p
								className={`text-xs text-gray-500 uppercase text-[${color}]`}>
								{title}
							</p>
							<p className="text-xs text-gray-500 cursor-default">
								Joined {format(created)}
							</p>
						</footer>
					</div>
				</div>
			);
		});
	};

	return <Component />;
};

export default RecentUsers;
