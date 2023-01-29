import React, { useEffect, useState } from "react";
import bg from "../assets/games page.png";
import Games from "../Components/Games";
import { LoadingIcon } from "../Components/Icons";
import Overlay from "../Components/Overlay";
import { useFetch } from "../Contexts/Fetch";

const Gamespage = () => {
	const [games, setGames] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [err, setErr] = useState(null);
	const CustomFetch = useFetch();

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const { data, response } = await CustomFetch({
					url: "game",
					returnResponse: true,
				});
				if (!response.ok) throw Error();
				setGames(data.data);
			} catch (error) {
				console.log(error);
				setErr(true);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	return (
		<div>
			<section className="w-full h-[700px] mb-4 relative">
				<img
					src={bg}
					alt=""
					className="w-full h-full object-cover object-center"
				/>

				<Overlay description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum voluptatum totam rem eos cupiditate tempora veniam, sit doloribus molestias omnis nemo molestiae libero nostrum consequuntur non tempore blanditiis? Non sequi laborum optio mollitia incidunt enim laboriosam nobis commodi ex hic? Error unde numquam sit nisi veniam, et doloremque architecto aliquam!" />
			</section>

			<section className="w-full h-full pb-32 px-4">
				<h3 className="font-bold text-3xl text-center">Game List</h3>

				{isLoading && (
					<div className="mt-4">
						<LoadingIcon />
					</div>
				)}

				{err && (
					<div className="mx-4 grid place-content-center mt-6">
						<p className="bg-red-500 text-white px-4 py-2">
							An error has occured while trying to load games
							list....{" "}
						</p>
					</div>
				)}

				{!isLoading && !err && (
					<section className="flex flex-row flex-wrap justify-center gap-24 mt-16">
						<Games items={games} />
					</section>
				)}
			</section>
		</div>
	);
};

export default Gamespage;
