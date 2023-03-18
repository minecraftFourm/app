import DOMPurify from "dompurify";
import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const DisplayActivities = (props) => {
	const { activity, owner } = props;

	const Component = () => {
		return activity.map((item) => {
			console.log(owner);
			// * If the item has a comment property, then it's a comment, else it's a post.
			if (item.comment) {
				const {
					comment,
					updated,
					postId,
					post: { title },
					id,
				} = item;
				return (
					<div
						key={id}
						className="text-black w-full border border-gray-400 bg-white rounded-sm overflow-hidden">
						<header className="w-full flex flex-row items-center justify-between bg-violet-500 text-white px-2 py-1">
							<h4 className="font-medium ">
								<Link
									to={`/user/${owner.id}`}
									className="capitalize hover:underline">
									{owner.username}
								</Link>{" "}
								commented on{" "}
								<Link
									className="hover:underline"
									to={`/forum/post/${postId}#${id}`}>
									{title}
								</Link>
							</h4>
							<span className="font-light text-sm cursor-default">
								{format(updated)}
							</span>
						</header>
						<p className="w-full h-full line-clamp-6 px-2 py-1">
							{comment}
						</p>
					</div>
				);
			} else {
				const {
					id,
					title,
					updated,
					content,
					comments,
					owner: { id: ownerId, username },
				} = item;
				return (
					<div
						className="w-full border border-gray-400 bg-white rounded-sm overflow-hidden"
						key={id}>
						<header className="w-full flex flex-row items-center justify-between bg-violet-500 text-white px-2 py-1">
							<Link
								to={`/forum/post/${id}`}
								className="font-medium">
								{title}
							</Link>
							<span className="font-light text-sm cursor-default">
								{format(updated)}
							</span>
						</header>
						<section className="flex flex-col gap-4 p-2 min-h-[100px]">
							<div
								className="text-sm w-full h-full line-clamp-15"
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(content),
								}}></div>
						</section>
						<footer className="w-full flex flex-row justify-between items-center bg-gray-200 text-gray-700 px-2 py-2">
							<Link to={`/user/${ownerId}`} className="text-sm">
								Posted by {username}
							</Link>
							<span className="text-sm font-light">
								{comments.length}{" "}
								{comments.length === 0
									? "comments"
									: comments.length === 1
									? "comment"
									: "comments"}
							</span>
						</footer>
					</div>
				);
			}
		});
	};
	console.log(activity);
	return (
		<div className="flex flex-col gap-2">
			<Component />
		</div>
	);
};

export default DisplayActivities;
