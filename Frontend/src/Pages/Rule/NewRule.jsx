import React, { useEffect, useState } from "react";
import { useFetch } from "../../Contexts/Fetch";
import { useEditor, useEditorValue } from "../../Components/Editor";
import { useNavigate } from "react-router-dom";
import ForumHeader from "../../Components/ForumHeader";
import { LoadingIcon } from "../../Components/Icons";
import { toast } from "react-hot-toast";

const NewRule = () => {
	//create state for the form
	const Navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [disableSubmit, setDisableSubmit] = useState(false);
	const [err, setErr] = useState(false);
	const CustomFetch = useFetch();
	const Editor = useEditor();
	const EditorValue = useEditorValue();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const content = EditorValue();
		if (
			title.length > 0 &&
			description.length > 0 &&
			content &&
			content.length > 0
		) {
			setDisableSubmit(true);
			try {
				const CreateRule = CustomFetch({
					url: "rule",
					options: {
						method: "POST",
						body: JSON.stringify({
							title,
							content,
							description,
						}),
					},
					returnPromise: true,
				});

				toast.promise(CreateRule, {
					loading: "Creating rule...",
					success: (data) => {
						(async () => {
							let { data: ruleData } = await data.json();
							Navigate(`../rules/${ruleData.id}`, {
								replace: true,
							});
						})();
						return "Sucessfully created rule!";
					},
					error: (err) => {
						console.log(err);
						return "An error occured while creating rule!";
					},
				});
			} catch (error) {
				console.log(error);
			} finally {
				setDisableSubmit(false);
			}
		} else {
			if (!title || !content || !description)
				toast.error(
					"Title, description, and rule content are required.",
					{
						duration: 4000,
						position: "bottom-left",
					}
				);
		}
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
							Create a new rule:{" "}
						</h1>

						<form
							onSubmit={handleSubmit}
							className="flex flex-col gap-2">
							<input
								type="text"
								className="px-2 py-1 outline-none border border-gray-400 rounded-sm w-full"
								placeholder="Title..."
								size="200"
								onChange={(e) => {
									setTitle(() => e.target.value);
								}}
								value={title}
							/>
							<input
								type="text"
								className="px-2 py-1 outline-none border border-gray-400 rounded-sm w-full"
								placeholder="Description..."
								size="200"
								onChange={(e) => {
									setDescription(() => e.target.value);
								}}
								value={description}
							/>
							<Editor />
							<div className="flex justify-center mt-2">
								<button
									className="hover:bg-indigo-700 cursor-pointer bg-indigo-500 text-white py-1 px-6 border border-indigo-600 transition-colors duration-300 rounded"
									type="submit"
									disabled={disableSubmit}>
									Create Rule
								</button>
							</div>
						</form>
					</>
				)}
			</div>
		</div>
	);
};

export default NewRule;
