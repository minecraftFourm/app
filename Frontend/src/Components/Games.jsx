import React from "react";
import { Link } from "react-router-dom";

const Games = (props) => {
	const items = props.items;

	const Component = () => {
		return items.map((item) => {
			const { id, title, previewImg, description, tags, statsLink } =
				item;

			return (
				<div
					className="max-w-[520px] w-full h-[300px] sm:h-fit flex flex-row sm:flex-col text-gray-500 shadow-md"
					key={id}>
					{previewImg && (
						<img
							src={previewImg}
							alt=""
							className="max-w-[150px] sm:max-w-none w-full max-h-[300px] object-cover object-left games-shadow"
						/>
					)}
					<div className="flex flex-col gap-4 w-full justify-between border px-4 py-2">
						<div className="flex flex-col">
							<header className="font-medium text-lg text-center text-gray-600">
								{title}
							</header>
							<p className="text-sm text-center text-ellipsis line-clamp-[9]">
								{description}
							</p>
						</div>
						<footer className="w-full flex flex-row justify-between items-center">
							<div className="flex flex-col gap-0">
								<span className=" font-semibold text-base">
									Tags
								</span>
								<div className="flex flex-row gap-2 text-sm">
									{tags &&
										tags.map((tag) => {
											return <p key={tag}>{tag}</p>;
										})}
								</div>
							</div>
							<Link
								to={`./stats/${statsLink}`}
								className="text-gray-500 font-semibold text-base">
								Stats
							</Link>
						</footer>
					</div>
				</div>
			);
		});
	};

	return <Component />;
};

export default Games;
