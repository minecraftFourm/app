import React, { lazy, useEffect } from "react";
import ForumHeader from "../../Components/ForumHeader";
import FormPageContent from "../../Components/ForumPage/FourmPageContent";
import RecentComments from "../../Components/HomePage/RecentComments";
import RecentPosts from "../../Components/HomePage/RecentPosts";
import RecentUsers from "../../Components/HomePage/RecentUsers";
import { LoadingIcon } from "../../Components/Icons";
import { useFetch } from "../../Contexts/Fetch";
const ErrorComponent = lazy(() => import("../../Components/Error"));

const Forumpage = () => {
	const CustomFetch = useFetch();
	const [category, setCategory] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(true);
	const [error, setError] = React.useState(null);
	const [comments, setComments] = React.useState(null);
	const [posts, setPosts] = React.useState(null);
	const [users, setUsers] = React.useState(null);

	useEffect(() => {
		(async () => {
			try {
				const { data, response } = await CustomFetch({
					url: "mainCategory",
					returnResponse: true,
				});

				const { data: commentsData } = await CustomFetch({
					url: "comment?limit=5",
				});
				setComments(commentsData.data);

				// TODO: Needs to be sort based on how much comments it has
				const { data: postsData } = await CustomFetch({
					url: "post?limit=5",
				});
				setPosts(postsData.data);

				const { data: userData, response: userResponse } =
					await CustomFetch({
						url: "user?limit=5",
						returnResponse: true,
					});

				if (userResponse.ok) {
					// * Sorts the user based on the amount of posts they have in descending order.
					const user = userData.data;
					const sortedList = user.sort((a, b) => {
						return b.post.length - a.post.length;
					});
					setUsers(sortedList);
				}

				if (!response.ok) throw new Error();
				setCategory(data.data);
			} catch (error) {
				console.log(error);
				setError(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	return (
		<div className="pb-32 bg-[#1B263B] ">
			{/* Hero */}
			<ForumHeader />

			{/* Forum */}
			<div className="w-full pt-16 flex sm:px-2 ms:px-8 px-16 py-4 gap-8">
				{error && <ErrorComponent />}
				{isLoading && <LoadingIcon color="#fff" />}
				{!isLoading && !error && (
					<>
						<section className="w-full bg-white h-fit px-4 py-6 flex flex-col gap-6">
							{category && (
								<FormPageContent category={category} />
							)}
						</section>
						<aside className="h-fit w-[450px] lg:hidden bg-white pt-6 pb-2 px-2 flex flex-col gap-4">
							<div className="w-full h-fit outline outline-1 pb-2 outline-gray-400">
								<p className="w-full bg-violet-500 text-white px-2 py-1 drop-shadow-lg">
									Recent Comments
								</p>
								<div className="flex flex-col gap-2 mt-2 px-1 min-h-[250px]">
									{comments.length !== 0 && (
										<RecentComments items={comments} />
									)}

									{comments.length === 0 && (
										<p className="text-center text-sm text-gray-600">
											There are currently no recent
											comments.
										</p>
									)}
								</div>
							</div>

							<div className="w-full h-fit outline outline-1 pb-2 outline-gray-400">
								<p className="w-full bg-violet-500 text-white px-2 py-1 drop-shadow-lg">
									Top Posts
								</p>
								<div className="flex flex-col gap-2 mt-2 px-1 min-h-[250px]">
									{posts.length !== 0 && (
										<RecentPosts items={posts} />
									)}

									{posts.length === 0 && (
										<p className="text-center text-sm text-gray-600">
											There are currently no recent
											comments.
										</p>
									)}
								</div>
							</div>

							<div className="w-full h-fit outline outline-1 pb-2 outline-gray-400">
								<p className="w-full bg-violet-500 text-white px-2 py-1 drop-shadow-lg">
									Top Users
								</p>
								<div className="flex flex-col gap-2 mt-2 px-1 min-h-[250px]">
									{users.length !== 0 && (
										<RecentUsers items={users} />
									)}

									{users.length === 0 && (
										<p className="text-center text-sm text-gray-600">
											There are currently no recent
											comments.
										</p>
									)}
								</div>
							</div>
						</aside>
					</>
				)}
			</div>
		</div>
	);
};

export default Forumpage;
