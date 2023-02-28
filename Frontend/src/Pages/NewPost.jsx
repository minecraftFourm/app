import React, { useEffect, useState } from "react";
import { useFetch } from "../Contexts/Fetch";
import { useEditor, useEditorValue } from "../Components/Editor";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import ForumHeader from "../Components/ForumHeader";
import { LoadingIcon } from "../Components/Icons";
import { toast } from "react-hot-toast";
import { UseUser } from "../Contexts/UserContext";
import { TOAST_OPTIONS } from "../config";

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
	const [disableSubmit, setDisableSubmit] = useState(false);
	const [post, setPost] = useState("");
	const [err, setErr] = useState(false);
	const CustomFetch = useFetch();
	const Editor = useEditor();
	const EditorValue = useEditorValue();
	const { state } = useLocation();

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const { data: categoryData, response } = await CustomFetch({
					url: "category",
					returnResponse: true,
				});

				if (!response.ok) throw Error();
				setCategoryData(() => {
					let isAdmin =
						User && User.role && User.role.isAdmin ? true : false;

					//  * Arranges the data.
					let data = categoryData.data.filter((item) => {
						// * Sorts the category. If a user is admin, they're allowed to see all categories, while users that are not admin are not allowed to see admin categories.
						if (isAdmin && item.adminOnly) {
							return { value: item.id, label: item.name };
						} else if (!item.adminOnly) {
							return { value: item.id, label: item.name };
						}
					});

					/*
					 * Loops over the category and formats them in a way where the react-select package can use them.
					 * While formatting the data, if a state exists, meaning if a user has been redirected from a different page to new post with a category id, while looping, it checks if the categoryId given mactches an id, and if it does, it sets the defaultCategory to the id.
					 */
					let i = 0;
					return data.map((item) => {
						// * Sets the default category
						if (state && state.category === item.id) {
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
		if (
			inputState.title &&
			inputState.category &&
			content &&
			content.length > 0
		) {
			setDisableSubmit(true);
			try {
				const CreatePost = CustomFetch({
					url: "post",
					options: {
						method: "POST",
						body: JSON.stringify({
							title: inputState.title,
							content,
							category: inputState.categoryId,
						}),
					},
					returnPromise: true,
				});

				toast.promise(CreatePost, {
					loading: "Creating post...",
					success: (data) => {
						(async () => {
							let { data: postData } = await data.json();
							Navigate(`../forum/post/${postData.id}`, {
								replace: true,
							});
						})();
						return "Sucessfully created your post!";
					},
					error: (err) => {
						console.log(err);
						return "An error occured while creating your post!";
					},
				});
			} catch (error) {
				console.log(error);
			} finally {
				setDisableSubmit(false);
			}
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
									type="submit"
									disabled={disableSubmit}>
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
