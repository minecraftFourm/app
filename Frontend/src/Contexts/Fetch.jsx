import React, { createContext, useContext } from "react";
import { API_URL } from "../config";

const FetchProvider = createContext();
export const useFetch = () => useContext(FetchProvider);

const Fetch = ({ children }) => {
	const fetchData = async ({
		url,
		options,
		returnResponse = false,
		returnPromise = false,
	}) => {
		if (returnResponse != true && returnResponse != false) {
			return console.error(
				"Invalid Parameters given to useFetch hook..."
			);
		}

		if (returnPromise) {
			return fetch(`${API_URL}/${url}`, {
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				...options,
			});
		}

		const response = await fetch(`${API_URL}/${url}`, {
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			...options,
		});

		if (response.statusCode === 401) {
			// TODO: redirect the user to unauthorized error page.
			console.log("Unauthorized...");
		}

		if (!returnResponse && !response.ok) {
			// TODO: handle error here for requests that don't need their response's returned.
		}

		const data = await response.json();
		const returnValue = {
			data,
			response: returnResponse ? response : null,
		};
		return returnValue;
	};

	return (
		<FetchProvider.Provider value={fetchData}>
			{children}
		</FetchProvider.Provider>
	);
};

export default Fetch;
