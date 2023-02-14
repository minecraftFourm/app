import React from "react";
import Vector1 from "../assets/Vector1.png";
import image4 from "../assets/image4.png";

const MaintenancePage = () => {
	return (
		<div className="mt-12 h-screen relative ">
			<div className="grid grid-cols-1">
				<div className="row-span-1 mx-auto">
					<img
						className="object-contain h-25 w-25"
						src={image4}
						alt="Maintenance"
					/>
				</div>
				<div className="row-span-1 mx-auto text-gray-500 text-3xl">
					<b>We are currently under maintenance.</b>
				</div>
				<div className="row-span-1 mx-auto text-gray-400">
					Please try again later!
				</div>
				<div className="row-span-1 mx-auto mt-3"></div>
			</div>
			<img
				className="max-h-32 max-w-32 mt-14 absolute bottom-0"
				src={Vector1}
			/>
		</div>
	);
};

export default MaintenancePage;
