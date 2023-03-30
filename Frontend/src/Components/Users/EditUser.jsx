import React from "react";

const EditUser = (props) => {
	const {
		user: { username, id },
	} = props;
	return (
		<div className="text-white">
			<h4>Editing {username} </h4>
			<form action=""></form>
		</div>
	);
};

export default EditUser;
