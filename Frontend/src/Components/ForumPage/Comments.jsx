import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const Comments = (props) => {
	const { comments } = props;

	const Component = () => {
		return comments.map((comment) => {
			const {
				id,
				updated,
				comment: commentContent,
				user: {
					username,
					profilePicture,
					role,
					created,
					reactions,
					post,
					id: userId,
				},
			} = comment;

			return (
				<div
					key={id}
					id={id}
					className="px-2 flex flex-row gap-2 mx-1 mt-4 min-h-[400px]">
					<div className="max-w-[300px] w-full pb-2 outline outline-1 outline-gray-400 md:hidden">
						<div className="mb-4 h-full">
							<img
								className="mx-auto pt-6"
								src={profilePicture}
								alt={`profile picture of ${username}`}></img>
							<div className="w-full h-fit flex flex-col flex-wrap items-center justify-center mt-2">
								<Link
									to={`/user/${userId}`}
									className="text-3xl font-bold capitalize">
									{username}
								</Link>

								<div>
									<p
										style={{
											backgroundColor: role.color,
										}}
										className="text-sm text-white font-bold rounded-sm border-[1px] px-2 outline-indigo-700">
										{role.title.toUpperCase()}
									</p>
								</div>
								<div className="w-full h-full mt-4 px-4">
									<div className="px-2 w-full flex flex-row justify-between items-center">
										<p className="font-bold text-gray-500">
											Joined:
										</p>
										<p>{format(created)}</p>
									</div>
									<div className="px-2 w-full h-full flex flex-row justify-between items-center">
										<p className="font-bold text-gray-500">
											Posts:
										</p>
										<p>{post.length}</p>
									</div>
									<div className="px-2 w-full h-full flex flex-row justify-between items-center">
										<p className="font-bold text-gray-500">
											Reactions:
										</p>
										<p>{reactions.length}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full overflow-hidden px-2 py-2 outline outline-1 flex flex-col justify-between outline-gray-400 bg-gray-100">
						<div className="pb-4 w-full">{commentContent}</div>
						<div className="w-full justify-between flex flex-row text-gray-500">
							<p className="text-sm">{format(updated)}</p>

							<div className="flex flex-row gap-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 cursor-pointer">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
									/>
								</svg>

								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 cursor-pointer">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
			);
		});
	};

	return <Component />;
};

export default Comments;
