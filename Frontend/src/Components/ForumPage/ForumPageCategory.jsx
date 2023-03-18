import React from "react";
import { Link } from "react-router-dom";

const ForumPageCategory = (props) => {
	const { categories } = props;

	const Component = () => {
		return categories.map((category) => {
			const { id, name, posts } = category;
			const commentsLength = posts.reduce((accumulator, currentValue) => {
				return accumulator + currentValue.comments.length;
			}, 0);
			return (
				<div
					key={id}
					className="w-full flex flex-row justify-between bg-white p-2 items-center rounded-md cursor-pointer">
					<div className="flex gap-4 items-center flex-row">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="text-violet-500 w-8 h-8">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
							/>
						</svg>
						<Link to={`./category/${id}`} className="font-medium">
							{name}
						</Link>
					</div>
					<div className="flex-row justify-between gap-8 items-center sm:hidden flex">
						<div className="flex flex-col items-center">
							<h5 className="text-violet-500">Posts</h5>
							<p className="font-semibold">
								{posts && posts.length}
							</p>
						</div>
						<div className="flex flex-col items-center">
							<h5 className="text-violet-500">Comments</h5>
							<p className="font-semibold">{commentsLength}</p>
						</div>
					</div>
				</div>
			);
		});
	};

	Component();
	return <Component />;
};

export default ForumPageCategory;
