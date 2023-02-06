import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ForumHeader from "../../Components/ForumHeader";
import PostComponent from "../../Components/ForumPage/Posts";
import { AddNewIcon, LoadingIcon } from "../../Components/Icons";
import { useFetch } from "../../Contexts/Fetch";
import { useDebounce } from "usehooks-ts";
import { UseUser } from "../../Contexts/UserContext";

const Posts = () => {
	const { id } = useParams();
	const CustomFetch = useFetch();
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [searchParam, setSearchParam] = useState("");
	const [showPrevBtn, setShowPrevBtn] = useState(false);
	const [showNextBtn, setShowNextBtn] = useState(true);
	const [showAddIcon, setShowAddIcon] = useState(false);
	const [allPosts, setAllPosts] = useState([]);
	const User = UseUser();

	// Pagination: Keep track of the current page and set a limitation of posts per page
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(9);
	// Pagination: Keep track of indexes to slice the array - this is for initial render, I calculate additional renders in the btns or useEffects
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;

	const showThesePosts = allPosts?.slice(indexOfFirstPost, indexOfLastPost);

	const debounceValue = useDebounce(searchParam, 500);

	const handlePageChange = (direction) => {
		// console.log(currentPage);
		// If the user hits the previous btn
		if (direction === "prev") {
			if (currentPage - 1 === 1) {
				// console.log("Reached first page");
				setShowPrevBtn(false);
				setShowNextBtn(true);
			}

			if (currentPage - 1 !== 1) {
				setShowPrevBtn(true);
				setShowNextBtn(true);
			}
		}

		// If the user hits the next btn
		if (direction === "next") {
			if (currentPage + 1 === Math.ceil(allPosts.length / postsPerPage)) {
				// console.log("Reached last page");
				setShowNextBtn(false);
				setShowPrevBtn(true);
			}

			if (currentPage + 1 !== Math.ceil(allPosts.length / postsPerPage)) {
				setShowNextBtn(true);
				setShowPrevBtn(true);
			}

			if (currentPage + 1 !== 1) {
			}
		}
	};

	useEffect(() => {
		if (data && User.isAuthenticated) {
			// * If user is authenticated, and has permission to post, or if the category is an adminOnly category and the user has admin permissions.
			const { adminOnly } = data;
			const { role: { isAdmin, canCreatePost }} = User
			if ((adminOnly && isAdmin) || !adminOnly && canCreatePost ) setShowAddIcon(true);
		}
		else {
			setShowAddIcon(false)
		}
	}, [data]);

	useEffect(() => {
		// If there is no data, call the DB
		if (!data) {
			(async () => {
				// console.log("No data exist, calling the DB");
				// console.log("inital data loaded");
				setIsLoading(true);
				// TODO: We can limit the amount of data pulled in the future - we can then dynamically call additional data and add it to the "data" state
				const { data, response } = await CustomFetch({
					url: `category/${id}`,
					returnResponse: true,
				});

				if (!response.ok) {
					// TODO: redirect to not found page.
					return alert("Can't find category");
				}

				setIsLoading(false);
				setData(data.data);
				setAllPosts(data.data.posts);
				//
			})();
		}

		//* if there is data, set the filtered data
		if (data) {
			// console.log("Data exist, filtering data");
			// setShowPrevBtn(false);
			if (searchParam.length === 0) {
				//* Might always set page to 1
				setCurrentPage(1);
				//* reset posts to original array
				setAllPosts(data?.posts);
				//* setPostToShow(data?.posts.slice(0, postsPerPage));
			}

			if (searchParam != "") {
				setCurrentPage(1);
				//* The full array of filtered posts
				const filteredPosts = data?.posts.filter((item) => {
					return searchParam.toLowerCase() === ""
						? item
						: item.title
								.toLowerCase()
								.includes(searchParam.toLowerCase());
				});
				setAllPosts(filteredPosts);
				setShowPrevBtn(false);
			}
		}
	}, [debounceValue]);

	const previousPage = () => {
		// console.log(currentPage);
		setCurrentPage(currentPage - 1);
		handlePageChange("prev");
	};

	const nextPage = () => {
		setCurrentPage(currentPage + 1);
		handlePageChange("next");
	};

	// console.log(data?.posts);
	// console.log(allPosts?.length);
	// console.log(currentPage);

	return (
		<div className="pb-32 bg-[#1B263B]">
			<ForumHeader />

			<div className="mt-32 px-2 w-full h-full">
				<div className="bg-white w-full h-full min-h-[792px] p-2">
					<div className="border border-gray-400 min-h-[792px] relative">
						<header className="flex justify-between flex-row bg-gray-300 p-2 gap-6 items-center">
							<h1 className="text-gray-600 text-2xl font-semibold">
								{data && data.name} {isLoading && "Loading..."}
							</h1>
							<div className="flex flex-row gap-2 items-center max-w-[400px] w-full">
								<input
									onChange={(e) => {
										setSearchParam(e.target.value);
									}}
									type="text"
									name="search"
									id="search"
									placeholder="Search..."
									className="px-2 py-1 border-slate-500 w-full rounded-sm outline-none placeholder-slate-500 text-slate"
								/>
								{showAddIcon && (
									<Link
										to="../forum/new"
										state={{ category: id }}>
										{/* TODO: send user to new post page with the right category */}
										<AddNewIcon width="8" height="8" />
									</Link>
								)}
							</div>
						</header>

						<section className="mt-8 flex flex-col gap-2 pb-8 px-2">
							{data && <PostComponent posts={showThesePosts} />}
							{!data && <LoadingIcon color="text-black" />}
						</section>
						<section
							className={`w-full justify-center flex flex-row gap-4 my-2 absolute bottom-0 ${
								Math.ceil(allPosts?.length / postsPerPage) === 1
									? "hidden"
									: ""
							}`}>
							<button
								className={`bg-violet-500 px-2 py-1 text-white rounded-sm ${
									showPrevBtn ? "" : "hidden"
								}`}
								onClick={previousPage}>
								Previous Page
							</button>
							<button
								className={`bg-violet-500 px-2 py-1 text-white rounded-sm ${
									showNextBtn ? "" : "hidden"
								}`}
								onClick={nextPage}>
								Next Page
							</button>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Posts;