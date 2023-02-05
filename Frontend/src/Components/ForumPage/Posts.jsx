import DOMPurify from "dompurify";
import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { convert } from "html-to-text";
import { DeleteIcon } from "../Icons";
import { UseUser } from "../../Contexts/UserContext";
import { useFetch } from "../../Contexts/Fetch";
import { toast } from "react-hot-toast";

// const { convert } = require('html-to-text');

const Posts = (props) => {
	const { posts: data } = props;
	const CustomFetch = useFetch();
	const currentUser = UseUser();

	const Component = () => {
		// These are the filtered posts - we map them on the page
		const posts = data.map((item) => {
			const {
				id,
				updated,
				ownerId,
				content,
				title,
				owner: { profilePicture, username, id: postUserId },
				comments,
			} = item;

			const {
				role,
				id: userId,
				isAuthenticated,
				isLoading,
			} = currentUser;
			//* if the userIsAuthenticated, and is either an admin, or has permission to delete any post or can delete own post
			const canDeletePost =
				isAuthenticated && !isLoading
					? role.isAdmin ||
					  role.canDeleteOtherPost ||
					  (userId === postUserId && role.canDeletePost)
					: false;

			const handleDeletePost = (id) => {
				console.log(1);
				try {
					const DeletePost = CustomFetch({
						url: `post/${id}`,
						options: {
							method: "DELETE",
						},
						returnPromise: true,
					});

					toast.promise(DeletePost, {
						loading: "Deleting post...",
						success: (data) => {
							if (!data.ok) throw Error();
							return "Sucessfully deleted post!";
						},
						error: (err) => {
							console.log(err);
							return "An error occured while creating your post!";
						},
					});
				} catch (error) {
					console.log(error);
				}
			};

			return (
				<div
					className="flex flex-row gap-4 justify-between border overflow-hidden bg-gray-100 p-2 border-gray-300"
					key={id}>
					<div className="flex flex-row gap-2 flex-1">
						<img
							src={profilePicture}
							className="rounded-full h-[48px] w-[48px] object-cover"
						/>
						<div className="flex flex-col justify-between">
							<Link
								to={`/forum/post/${id}`}
								className="line-clamp-1 text-ellipsis cursor-pointer text-gray-600">
								{convert(title).slice(0, 128)}
							</Link>
							<Link
								to={`/user/${ownerId}`}
								className="text-gray-400 text-sm cursor-pointer">
								{username}
							</Link>
						</div>
					</div>
					<p className="self-center text-sm text-gray-400 font-medium min-w-fit flex-1">
						{comments.length}{" "}
						{comments.length === 0
							? "Replies"
							: comments.length === 1
							? "Reply"
							: "Replies"}{" "}
					</p>
					<div className="flex items-end flex-col justify-between min-w-fit">
						{/* If the user owns the post and can delete posts, or if the user can delete other peoples post or if the user is an admin. */}
						{canDeletePost && (
							<div onClick={() => handleDeletePost(id)}>
								<DeleteIcon
									width="24"
									height="24"
									style="text-gray-400 cursor-pointer hover:text-gray-600"
								/>
							</div>
						)}
						<p className="font-light text-xs">{format(updated)}</p>
					</div>
				</div>
			);
		});

		return posts;
	};

	return <Component />;
};

export default Posts;
