import React, { useEffect, useState } from "react";

const DisplayUsers = (props) => {
	const { users } = props;
	const [color, setColor] = useState();
	const [showAmount, setShowAmount] = useState(6);

	const Component = () => {
		let userArray;

		if (users.length > showAmount) {
			userArray = users.slice(0, showAmount);
		} else {
			userArray = users;
		}

		return userArray.map((user) => {
			const { username, id, profilePicture } = user.referringUser;
			return (
				<a
					key={id}
					href={`/user/${id}`}
					className="w-24 h-24 rounded-full">
					<img
						className=""
						src={profilePicture}
						alt={`${username}'s Profile Picture`}
					/>
				</a>
			);
		});
	};

	useEffect(() => {
		const colors = [
			"red",
			"green",
			"blue",
			"orange",
			"green",
			"violet",
			"lime",
			"teal",
		];
		setColor(() => {
			const index = Math.floor(Math.random() * colors.length);
			return colors[index];
		});
	}, []);

	return (
		<div className="w-full gap-2 mx-6 my-1 flex flex-row flex-wrap">
			<Component />
			{users.length > 6 && (
				<div
					style={{ backgroundColor: color }}
					className={`w-24 h-24 rounded-full grid place-content-center place-items-center font-semibold text-2xl`}>
					<p>{users.length - 6}+</p>
				</div>
			)}
		</div>
	);
};

export default DisplayUsers;
