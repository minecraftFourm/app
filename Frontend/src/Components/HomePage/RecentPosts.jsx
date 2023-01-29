import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const RecentPosts = (props) => {
	const {
		title,
		updated,
		owner: { username, id: userId },
		id,
	} = props;

	return (
		<div
			className="flex border border-violet-500 items-center px-2 py-1"
			key={id}>
			<div className="w-full">
				<Link
					to={`./forum/post/${id}`}
					className="line-clamp-1 text-sm font-semibold">
					{title}
				</Link>
				<footer className="w-full flex flex-row justify-between">
					<Link
						to={`/user/${userId}`}
						className="text-xs text-gray-500">
						{username}
					</Link>
					<p className="text-xs text-gray-500">{format(updated)}</p>
				</footer>
			</div>
		</div>
	);
};

export default RecentPosts;
