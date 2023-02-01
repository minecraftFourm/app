import React from "react";
import ForumPageCategory from "./ForumPageCategory";

const FormPageContent = (props) => {
	const { category: item } = props;

	const Component = () => {
		return item.map((mainCategory) => {
			const { id, title, description, categories } = mainCategory;

			return (
				<section
					key={id}
					className="w-full h-fit border border-slate-400 rounded-sm overflow-hidden bg-violet-500">
					<div className="bg-white px-2 py-2">
						<h3 className="cursor-default font-semibold text-lg">
							{title}
						</h3>
						{description && (
							<p className="text-sm cursor-default text-gray-500">
								{description}
							</p>
						)}
					</div>
					<section className="py-4 px-2 flex flex-col gap-2">
						<ForumPageCategory categories={categories} />
					</section>
				</section>
			);
		});
	};

	Component();
	return <Component />;
};

export default FormPageContent;
