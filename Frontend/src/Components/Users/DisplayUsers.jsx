import React from "react";

const DisplayUsers = (props) => {
	const { users } = props;

	const Component = () => {
		let userArray;

		if (users.length > 6) {
			userArray = users.slice(0, 6);
		} else {
			userArray = users;
		}

		return userArray.map((user) => {
			const { username, id, profilePicture, role } = user.referringUser;
			return (
				<div key={id} className="">
					<img
						className="w-24 h-24 rounded-full"
						src={profilePicture}
						alt={`${username}'s Profile Picture`}
					/>
				</div>
			);
		});
	};

	return (
		<div className="w-full flex flex-row gap-2 mx-6 my-1">
			<Component />
			{users.length > 6 && (
				<div className="w-24 h-24 rounded-full bg-red-500 grid place-content-center place-items-center font-semibold text-2xl">
					<p>6+</p>
				</div>
			)}
		</div>
	);
};

export default DisplayUsers;
