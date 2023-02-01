import React, { useEffect, useState } from "react";
import { useFetch } from "../Contexts/Fetch";
import { useEditor, useEditorValue } from "../Components/Editor";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import ForumHeader from "../Components/ForumHeader";
import { LoadingIcon } from "../Components/Icons";
import { toast } from "react-hot-toast";
import { UseUser } from "../Contexts/UserContext";

const NewPost = () => {
	//create state for the form
	const Navigate = useNavigate();
	const [categoryData, setCategoryData] = useState(null);
	const [defaultCategory, setDefaultCategory] = useState(null);
	const [inputState, setInputState] = useState({
		title: "",
		category: "",
		categoryId: "",
	});
	const User = UseUser();
	const [isLoading, setIsLoading] = useState(false);
	const [post, setPost] = useState("");
	const [err, setErr] = useState(false);
	const CustomFetch = useFetch();
	const Editor = useEditor();
	const EditorValue = useEditorValue();
	const { state } = useLocation();
	console.log(state);

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const { data, response } = await CustomFetch({
					url: "category",
					returnResponse: true,
				});

				if (!response.ok) throw Error();
				setCategoryData(() => {
					let isAdmin =
						User && User.role && User.role.isAdmin ? true : false;
					/*
					 * Loops over the category and formats them in a way where the react-select package can use them.
					 * While formatting the data, if a state exists, meaning if a user has been redirected from a different page to new post with a category id, while looping, it checks if the categoryId given mactches an id, and if it does, it sets the defaultCategory to the id.
					 */

					const filteredItems = (() => {
						if (isAdmin) {
							return data.data.map((item) => {
								return { value: item.id, label: item.name };
							});
						} else {
							return data.data.filter((item) => {
								if (!item.adminOnly) {
									return { value: item.id, label: item.name };
								}
							});
						}
					})();
					let i = 0;

					return filteredItems.map((item) => {
						if (state && state.category === item.id) {
							console.log("state exists");
							setDefaultCategory(i);
							updateState({
								category: item.name,
								categoryId: item.id,
							});
						}
						i++;
						return { value: item.id, label: item.name };
					});
				});
				// TODO: Better error handling
			} catch (error) {
				setErr(true);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const content = EditorValue();
		if (inputState.title && inputState.category && content.length > 0) {
			const { data, response } = await CustomFetch({
				url: "post",
				options: {
					method: "POST",
					body: JSON.stringify({
						title: inputState.title,
						content,
						category: inputState.categoryId,
					}),
				},
				returnResponse: true,
			});

			toast.success("Successfully created a new post.", {
				duration: 8000,
				position: "bottom-left",
			});
			Navigate(`../forum/post/${data.data.id}`);
		} else {
			if (!inputState.title || !inputState.categoryId || !content)
				toast.error("Title, category, and post content are required.", {
					duration: 4000,
					position: "bottom-left",
				});
		}
	};

	const updateState = (newValue) => {
		setInputState((prevState) => {
			return {
				...prevState,
				...newValue,
			};
		});
	};

	return (
		<div className="bg-[#1B263B] pb-16">
			<ForumHeader />

			<div className="bg-white px-4 mx-6 md:mx-2 sm:mx-0 sm:px-2 mt-16 py-4">
				{isLoading && <LoadingIcon />}
				{err && !isLoading && (
					<p className="text-lg text-gray-400 text-center">
						An error has occured while trying to fetch data from the
						server.
					</p>
				)}
				{!isLoading && !err && (
					<>
						<h1 className="font-bold text-indigo-700 text-4xl mb-4 sm:text-2xl">
							Create a new post:{" "}
						</h1>

						<form
							onSubmit={handleSubmit}
							className="flex flex-col gap-2">
							<input
								type="text"
								className="px-2 py-1 outline-none border border-gray-400 rounded-sm w-full"
								placeholder="Title..."
								size="200"
								onChange={(e) =>
									updateState({
										title: e.currentTarget.value,
									})
								}
								value={inputState.title}
							/>
							<Select
								options={categoryData}
								className="z-10 mb-2 basic-single"
								classNamePrefix="select"
								placeholder={
									categoryData
										? "Category..."
										: "There are no categories available..."
								}
								defaultValue={
									categoryData && defaultCategory != null
										? categoryData[defaultCategory]
										: null
								}
								isDisabled={!categoryData ? true : false}
								isClearable={true}
								isSearchable={true}
								name="Categories"
								onChange={(e) => {
									if (e === null) {
										updateState({
											category: null,
											categoryId: null,
										});
									} else {
										const category = e.label;
										const categoryId = e.value;
										updateState({ category, categoryId });
									}
								}}
							/>
							<Editor />
							<div className="flex justify-center mt-2">
								<button
									className="hover:bg-indigo-700 cursor-pointer bg-indigo-500 text-white py-1 px-6 border border-indigo-600 transition-colors duration-300 rounded"
									type="submit">
									Create Post
								</button>
							</div>
						</form>
					</>
				)}
			</div>
		</div>
	);
};

export default NewPost;
