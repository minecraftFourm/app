import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseUser } from "./UserContext";

const RequireAuth = ({ children }) => {
	const User = UseUser();
	const Navigate = useNavigate();

	console.log(User);
	useEffect(() => {
		console.log(User.isAuthenticated);
		if (!User.isAuthenticated && !User.isLoading) {
			Navigate("../login");
		}
	}, []);

	return <>{User.isAuthenticated && children}</>;
};

export default RequireAuth;
