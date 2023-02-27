import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ForumHeader from "../Components/ForumHeader";
import { useFetch } from "../Contexts/Fetch";
import { LoadingIcon } from "../Components/Icons";
import { format } from "timeago.js";
import Comments from "../Components/ForumPage/Comments";
import { UseUser } from "../Contexts/UserContext";
import { toast } from "react-hot-toast";

const ViewPost = () => {
	const { id } = useParams();
	const CustomFetch = useFetch();
	const [post, setPost] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [err, setErr] = useState(null);
	const { role: UserRole, isAuthenticated, id: CurrentUserID } = UseUser();
	const Navigate = useNavigate();

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const { data, response } = await CustomFetch({
					url: `post/${id}`,
					returnResponse: true,
				});
				if (!response.ok) throw Error();
				setPost(data.data);
			} catch (error) {
				console.log(error);
				setErr(true);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	const deletePost = async (postId, categoryId) => {
		const DeletePost = CustomFetch({
			url: `post/${postId}`,
			options: {
				method: "DELETE",
			},
			returnResponse: true,
		});

		toast.promise(DeletePost, {
			loading: "Deleting post...",
			success: ({ data, response }) => {
				if (!response.ok) {
					throw new Error();
				}
				Navigate(`/forum/category/${categoryId}`, {
					replace: true,
				});
				return "Sucessfully deleted your post!";
			},
			error: (err) => {
				console.log(err);
				return "An error occured while deleting your post!";
			},
		});
	};

	const fetchPostDetails = async () => {
		try {
			const { data, response } = await CustomFetch({
				url: `post/${id}`,
				returnResponse: true,
			});
			if (!response.ok) throw Error();
			setPost(data.data);
		} catch (error) {
			console.log(error);
			setErr(true);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-[#1B263B] pb-16">
			<ForumHeader />
			<button onClick={fetchPostDetails}>Click me</button>
			{isLoading && (
				<div className="mt-4">
					<LoadingIcon />
				</div>
			)}
			{err && (
				<div className="mx-4 grid place-content-center mt-6">
					<p className="bg-red-500 text-white px-4 py-2">
						An error has occured while trying to load this post{" "}
					</p>
				</div>
			)}
			{!isLoading && !err && (
				<div className="bg-white h-fit mx-6 md:mx-2 sm:mx-0 sm:px-2 mt-16 p-4">
					<div className="w-full h-fit outline outline-1 outline-gray-400 pb-4">
						<p className="w-full bg-violet-500 text-white text-xl px-2 py-2 drop-shadow-lg">
							{post.title}
						</p>
						<div className="px-2 flex flex-row gap-2 mx-1 mt-4 min-h-[500px]">
							<div className="max-w-[300px] w-full pb-2 outline outline-1 outline-gray-400 md:hidden">
								<div className="mb-4 h-full">
									<img
										className="mx-auto pt-6"
										src={post.owner.profilePicture}
										alt={`profile picture of ${post.owner.username}`}></img>
									<div className="w-full h-fit flex flex-col flex-wrap items-center justify-center mt-2">
										<Link
											to={`/user/${post.ownerId}`}
											className="text-3xl font-bold capitalize">
											{post.owner.username}
										</Link>

										<div>
											<p
												style={{
													backgroundColor:
														post.owner.role.color,
												}}
												className="text-sm text-white font-bold rounded-sm border-[1px] px-2 outline-indigo-700">
												{post.owner.role.title.toUpperCase()}
											</p>
										</div>
										<div className="w-full h-full mt-4 px-4">
											<div className="px-2 w-full flex flex-row justify-between items-center">
												<p className="font-bold text-gray-500">
													Joined:
												</p>
												<p>
													{format(post.owner.created)}
												</p>
											</div>
											<div className="px-2 w-full h-full flex flex-row justify-between items-center">
												<p className="font-bold text-gray-500">
													Posts:
												</p>
												<p></p>
											</div>
											<div className="px-2 w-full h-full flex flex-row justify-between items-center">
												<p className="font-bold text-gray-500">
													Reactions:
												</p>
												<p>{post.reactions.length}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="w-full overflow-hidden px-2 py-2 outline outline-1 flex flex-col justify-between outline-gray-400 bg-gray-100">
								<div
									className="pb-4 w-full"
									dangerouslySetInnerHTML={{
										__html: post.content,
									}}></div>
								<div className="w-full justify-between flex flex-row text-gray-500">
									<p className="text-gray-500 text-sm">
										{format(post.updated)}
									</p>
									<div className="flex flex-row gap-3">
										{isAuthenticated &&
											(UserRole.isAdmin ||
												UserRole.canDeleteOtherPost ||
												(UserRole.canDeletePost &&
													CurrentUserID ===
														post.ownerId)) && (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-6 h-6"
													onClick={() =>
														deletePost(
															post.id,
															post.categoryId
														)
													}>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
													/>
												</svg>
											)}

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

						<div className="mt-8 px-2">
							<div className="w-full flex flex-row justify-between gap-2 items-center px-2 text-violet-500">
								<h4 className="text-2xl font-bold">Comments</h4>
								{isAuthenticated && (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-8 h-8 cursor-pointer hover:text-violet-600 duration-300">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 4.5v15m7.5-7.5h-15"
										/>
									</svg>
								)}
							</div>

							<div>
								<Comments
									comments={post.comments}
									reloadComments={fetchPostDetails}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ViewPost;
