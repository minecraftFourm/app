import React, { useEffect, useState } from "react";
import Vector1 from "../assets/Vector1.png";
import image4 from "../assets/image4.png";
import { useCountdown } from "usehooks-ts";

const MaintenancePage = () => {
	const [intervalValue, setIntervalValue] = useState(1000);
	const [count, { startCountdown, stopCountdown, resetCountdown }] =
		useCountdown({
			countStart: 10,
			intervalMs: intervalValue,
		});

	useEffect(() => {
		startCountdown();
	}, []);

  // * Reloads the page once the countdown is over.
	useEffect(() => {
		if (count === 0) {
			window.location.reload();
		}
	}, [count]);

	return (
		<div className="h-screen relative">
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
					<p className="text-lg">Please try again later!</p>
					<p className="text-sm text-center mt-4">
						Reloading in {count}
					</p>
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
