import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseUser } from "./UserContext";

const AdminOnly = ({ children }) => {
	const Navigate = useNavigate();
	const User = UseUser();

	useEffect(() => {
		if (
			!(
				User.isAuthenticated &&
				!User.isLoading &&
				(User.role.isAdmin || User.role.isStaff)
			)
		) {
			Navigate("/");
		}
	}, []);

	return <div>{User.isAuthenticated && User.role.isAdmin && children}</div>;
};

export default AdminOnly;
