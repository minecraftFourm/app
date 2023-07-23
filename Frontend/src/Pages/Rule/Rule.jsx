import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { LoadingIcon } from "../../Components/Icons";
import { useFetch } from "../../Contexts/Fetch";
import ForumHeader from "../../Components/ForumHeader";
import { format } from "timeago.js";
import { UseUser } from "../../Contexts/UserContext";
import { toast } from "react-hot-toast";
import { DOMAIN_NAME } from "../../config";
import { useCopyToClipboard } from "usehooks-ts";

const Rule = () => {
	const { id } = useParams();
	const CustomFetch = useFetch();
	const [rule, setRule] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const User = UseUser();
	const Navigate = useNavigate();
	const location = useLocation();
	const [value, copy] = useCopyToClipboard();
	const copyLink = () => {
		copy(DOMAIN_NAME + location.pathname);
		toast("Successfully Copied Link", {
			duration: 2000,
			className: "bg-gray-800 text-white",
			position: "bottom-left",
		});
	};

	const deleteRule = async () => {
		const deleteRequest = CustomFetch({
			url: `rule/${id}`,
			options: {
				method: "DELETE",
			},
			returnPromise: true,
		});

		toast.promise(deleteRequest, {
			loading: "Deleting rule...",
			success: (data) => {
				Navigate("/rules", {
					replace: true,
				});
				return "Sucessfully deleted rule!";
			},
			error: (err) => {
				console.log(err);
				return "An error occured while deleting rule!";
			},
		});
	};

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const { response, data } = await CustomFetch({
					url: `rule/${id}`,
					returnResponse: true,
				});
				if (!response.ok) throw new Error();
				setRule(data.data);
			} catch (error) {
				Navigate("/notfound");
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	return (
		<div className="">
			<ForumHeader title={isLoading ? "..." : rule.title} />

			{isLoading && <LoadingIcon />}
			{!isLoading && (
				<div className="mx-4 my-8">
					<div className="">
						<div
							className="pb-4 px-4 w-full"
							dangerouslySetInnerHTML={{
								__html: rule.content,
							}}></div>

						<div className="w-full text-gray-400 px-4 items-center flex justify-between gap-4 border-t-2 border-t-gray-00 py-1">
							<p className="font-light text-gray-700 text-sm">
								{format(rule.created)}
							</p>

							<div className="flex flex-row gap-3">
								{/* Delete Icon */}
								{User.isAuthenticated &&
									(User.role.isAdmin ||
										User.role.canManageRules) && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6 cursor-pointer hover:text-gray-700 transition-colors duration-300"
											onClick={deleteRule}>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
											/>
										</svg>
									)}
								{/* Edit Icon */}

								{User.isAuthenticated &&
									(User.role.isAdmin ||
										User.role.canManageRules) && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											onClick={() =>
												Navigate(`/rules/edit/${id}`)
											}
											className="w-6 h-6 cursor-pointer hover:text-gray-700 transition-colors duration-300">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
											/>
										</svg>
									)}

								{/* Copy Icon */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									onClick={copyLink}
									className="w-6 h-6 cursor-pointer hover:text-gray-700 transition-colors duration-300 active:text-violet-500">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Rule;
