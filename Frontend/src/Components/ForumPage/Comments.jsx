import React from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { format } from "timeago.js";
import { useFetch } from "../../Contexts/Fetch";
import { UseUser } from "../../Contexts/UserContext";
import { useCopyToClipboard } from "usehooks-ts";
import { DOMAIN_NAME } from "../../config";

const Comments = (props) => {
	const { comments, reloadComments, setMode, commentTextField, commentBox } =
		props;
	const { role: UserRole, isAuthenticated, id: CurrentUserID } = UseUser();
	const CustomFetch = useFetch();
	const [value, copy] = useCopyToClipboard();
	const location = useLocation();

	const deleteComment = async (commentId) => {
		const DeleteComment = CustomFetch({
			url: `comment/${commentId}`,
			options: {
				method: "DELETE",
			},
			returnResponse: true,
		});

		toast.promise(DeleteComment, {
			loading: "Deleting comment...",
			success: ({ data, response }) => {
				if (!response.ok) {
					throw new Error();
				}

				reloadComments();
				return "Sucessfully deleted your comment!";
			},
			error: (err) => {
				console.log(err);
				return "An error occured while deleting your comment!";
			},
		});
	};

	const copyLink = (id) => {
		copy(DOMAIN_NAME + location.pathname + `#${id}`);
		toast("Successfully Copied Link", {
			duration: 2000,
			className: "bg-gray-800 text-white",
			position: "bottom-left",
		});
	};

	const handleEdit = ({ id, content }) => {
		commentBox.current.scrollIntoView();
		setMode({
			mode: "editComment",
			data: {
				id,
				content,
			},
		});
		commentTextField.current.value = content;
	};

	const Component = () => {
		return comments.map((comment) => {
			const {
				id,
				updated: commentUpdated,
				created: commentCreated,
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
							<p className="text-sm">
								{commentUpdated == commentCreated
									? format(commentCreated)
									: `Edited ${format(commentUpdated)}`}
							</p>

							<div className="flex flex-row gap-3">
								{/* Delete Icon */}
								{isAuthenticated &&
									(UserRole.isAdmin ||
										UserRole.canDeleteOtherPost ||
										(UserRole.canDeletePost &&
											CurrentUserID === userId)) && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6 cursor-pointer"
											onClick={() => deleteComment(id)}>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
											/>
										</svg>
									)}
								{/* Edit Icon */}
								{isAuthenticated &&
									(UserRole.isAdmin ||
										UserRole.canEditOtherPost ||
										(UserRole.canEditPost &&
											CurrentUserID === userId)) && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6 cursor-pointer"
											onClick={() =>
												handleEdit({
													id,
													content: commentContent,
												})
											}>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
											/>
										</svg>
									)}
								{/* Copy Link */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 cursor-pointer active:text-violet-500"
									onClick={() => copyLink(id)}>
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
