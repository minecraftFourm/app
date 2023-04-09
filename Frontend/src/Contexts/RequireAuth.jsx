import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseUser } from "./UserContext";

const RequireAuth = ({ children }) => {
	const User = UseUser();
	const Navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!User.isAuthenticated && !User.isLoading) {
			Navigate("/login");
		}
		setIsLoading(false);
	}, []);

	return <>{!isLoading && User.isAuthenticated && children}</>;
};

export default RequireAuth;
