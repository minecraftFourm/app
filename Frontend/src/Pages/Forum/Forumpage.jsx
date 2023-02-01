import React, { lazy, useEffect } from "react";
import ForumHeader from "../../Components/ForumHeader";
import FormPageContent from "../../Components/ForumPage/FourmPageContent";
import { LoadingIcon } from "../../Components/Icons";
import { useFetch } from "../../Contexts/Fetch";
const ErrorComponent = lazy(() => import("../../Components/Error"));

const Forumpage = () => {
	const CustomFetch = useFetch();
	const [category, setCategory] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(true);
	const [error, setError] = React.useState(null);

	useEffect(() => {
		(async () => {
			try {
				const { data, response } = await CustomFetch({
					url: "mainCategory",
					returnResponse: true,
				});

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
			<div className="w-full pt-16 flex px-16 py-4 gap-8">
				{error && <ErrorComponent />}
				{isLoading && <LoadingIcon />}
				{!isLoading && !error && (
					<>
						<section className="w-full bg-white h-fit px-4 py-6 flex flex-col gap-6">
							{category && (
								<FormPageContent category={category} />
							)}
						</section>
						<aside className="h-[900px] w-[450px] lg:hidden bg-white pt-6 pb-2 px-2 flex flex-col gap-4"></aside>
					</>
				)}
			</div>
		</div>
	);
};

export default Forumpage;
