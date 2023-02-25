import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ForumHeader from "../Components/ForumHeader";
import { useFetch } from "../Contexts/Fetch";
import { LoadingIcon } from "../Components/Icons";
import { format } from "timeago.js";

const ViewPost = () => {
	const { id } = useParams();
	const CustomFetch = useFetch();
	const [post, setPost] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [err, setErr] = useState(null);

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

	console.log(post);

	return (
		<div className="bg-[#1B263B]">
			<ForumHeader />
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
										<p className="text-3xl font-bold capitalize">
											{post.owner.username}
										</p>

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
								<p className="text-gray-500 text-sm">
									{format(post.updated)}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ViewPost;
