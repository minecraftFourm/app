import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const RecentPosts = (props) => {
	const Items = props.items;

	const Component = () => {
		return Items.map((item) => {
			const {
				title,
				updated,
				owner: { username, profilePicture, id: userId },
				id,
			} = item;

			return (
				<div
					className="flex flex-row justify-between gap-2 border border-violet-500 items-center px-2 py-1"
					key={id}>
					<img
						src={profilePicture}
						alt={`${username}'s profile picture.`}
						className="rounded-full h-[32px] w-[32px]"
					/>
					<div className="w-full">
						<Link
							to={`./forum/post/${id}`}
							className="line-clamp-1 text-sm font-semibold">
							{title}
						</Link>
						<footer className="w-full flex flex-row justify-between">
							<Link
								to={`./user/${userId}`}
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

export default RecentPosts;
