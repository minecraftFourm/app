import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ForumHeader from "../../Components/ForumHeader";
import { useFetch } from "../../Contexts/Fetch";

const Rulespage = () => {
	const CustomFetch = useFetch();
	const [rules, setRules] = useState();

	useEffect(() => {
		(async () => {
			const { response, data } = await CustomFetch({
				url: "rule",
				returnResponse: true,
			});

			if (response.ok) {
				setRules(data.data);
			}
			console.log(data);
		})();
	}, []);

	//! ID 1: 27a41c83-eec4-4927-b538-38a6988cbe18
	//! ID 2: e3c6ac3b-80b9-4591-b70b-e6030e98b828

	const RulesComponent = () => {
		return rules.map((rule) => {
			return (
				<Link
					to={`./${rule.id}`}
					key={rule.id}
					className="text-base hover:underline text-gray-500 cursor-pointer">
					{rule.title}
				</Link>
			);
		});
	};

	const RulesComponent2 = () => {
		return rules.map((rule) => {
			return (
				<div
					key={rule.id}
					className="border border-gray-400 px-2 py-1 flex flex-col gap-1 rounded-md">
					<Link
						to={`./${rule.id}`}
						className="text-indigo-500 font-normal text-2xl cursor-pointer">
						{rule.title}
					</Link>
					<p className="text-gray-400 text-sm line-clamp-2">
						{rule.description}
					</p>
				</div>
			);
		});
	};

	return (
		<div className="bg-[#1B263B]">
			<ForumHeader />

			{!rules ||
				(rules && rules.length === 0 && (
					<p className="text-white font-semibold w-full text-center mx-auto p-4 ">
						There is currently no active rule available.
					</p>
				))}
			{rules && rules.length != 0 && (
				<div className="h-fit mx-6 md:mx-2 sm:mx-0 sm:px-2 mt-16 p-4 flex flex-row gap-4">
					<div className="bg-white min-w-[200px] pb-2 h-fit md:hidden min-h-[130px]">
						<h2 className="text-center font-bold text-gray-500 py-1 bg-gray-200 text-2xl mb-2">
							Pages
						</h2>
						<div className="flex flex-col gap-1 px-2">
							<RulesComponent />
						</div>
					</div>

					<div className="bg-white p-4 sm:px-2 w-full h-fit flex flex-col gap-2">
						<RulesComponent2 />
					</div>
				</div>
			)}
		</div>
	);
};

export default Rulespage;
