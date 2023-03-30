import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const RecentComments = (props) => {
	const items = props.items;
	const Component = () => {
		return items.map((item) => {
			const {
				comment,
				updated,
				user: { username, profilePicture, id: userId },
				id,
			} = item;
			return (
				<div
					className="flex border border-violet-500 gap-2 items-center px-2 py-1"
					key={id}>
					<img
						src={profilePicture}
						alt=""
						className="rounded-full h-[32px] w-[32px]"
					/>
					<div className="w-full">
						<Link
							to={""}
							className="line-clamp-1 text-sm font-semibold">
							{comment}
						</Link>
						<footer className="w-full flex flex-row justify-between">
							<Link
								to={`/user/${userId}`}
								className="text-xs text-gray-500 capitalize">
								{username}
							</Link>
							<p className="text-xs text-gray-500 cursor-default">
								{format(updated)}
							</p>
						</footer>
					</div>
				</div>
			);
		});
	};

	return <Component />;
};

export default RecentComments;
