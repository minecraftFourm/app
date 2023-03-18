import React from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
	const { id } = useParams();

	if (id) {
		console.log(id);
	}
	return (
		<div className="bg-[#1B263B] py-16 px-8 w-full h-full">
			<div className="bg-red-200 w-full h-[250px] relative">
				<div className="flex flex-row gap-2 right-1 top-1 absolute">
					<div className="bg-red-300 w-8 h-8"></div>
					<div className="bg-red-300 w-8 h-8"></div>
					<div className="bg-red-300 w-8 h-8"></div>
					<div className="bg-red-300 w-8 h-8"></div>
					<div className="bg-red-300 w-8 h-8"></div>
				</div>
				<div className="absolute -bottom-16 w-full h-fit flex flex-row gap-12">
					<div className="rounded-full min-w-[180px] max-w-[180px] h-[180px] ml-4 bg-red-300 -bottom-16 left-6"></div>
					<p className="w-full h-fit line-clamp-2 border py-1 px-2 mr-4 mt-4">
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Laudantium omnis molestias vel autem! Voluptate
						harum vel esse perspiciatis sapiente inventore itaque
						culpa? Consequatur earum cupiditate laboriosam, dolores
						vero quisquam sapiente!
					</p>
				</div>
			</div>
		</div>
	);
};

export default Profile;
