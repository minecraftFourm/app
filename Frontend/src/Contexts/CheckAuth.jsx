import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { UseSetUser, UseUser } from "./UserContext";
import { useFetch } from "./Fetch";
import { LoadingIcon } from "../Components/Icons";

const CheckAuth = ({ children }) => {
	const setUser = UseSetUser();
	const user = UseUser();
	const accessToken = Cookies.get("Authorization");
	const CustomFetch = useFetch();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				if (accessToken) {
					let token = accessToken.match(/^s:(.*)\..*$/)[1];
					let { id: userId } = jwt_decode(token);

					const {
						data: {
							data: { id, username, profilePicture, role },
						},
						response,
					} = await CustomFetch({
						url: `user/${userId}`,
						options: {
							method: "GET",
						},
						returnResponse: true,
					});

					if (!response.ok)
						throw new Error("Error while trying to login.");
					setUser({
						id,
						username,
						profilePicture,
						role,
						isAuthenticated: true,
						isLoading: false,
					});
				}
			} catch (error) {
				setUser({
					id: "",
					username: "",
					isAuthenticated: false,
					isLoading: false,
				});
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	return (
		<>
			{isLoading && (
				<div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
					<LoadingIcon color="#000" loading={isLoading} />
					{/* TODO: If it's still loading for like the next 10 second maybe show a message? */}
					{/* {
            setTimeout(() => {
              return (
                <p className='text-sm text-gray-500'>Uhmmm?</p>
              )
            }, 10000)
          } */}
				</div>
			)}
			{!isLoading && children}
		</>
	);
};

export default CheckAuth;
