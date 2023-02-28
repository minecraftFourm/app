import React, { createContext, useContext, useEffect, useState } from "react";
import { SETTINGS_ID } from "../config";
import { useFetch } from "./Fetch";

const SettingsProvider = createContext();
export const useSettings = () => useContext(SettingsProvider);

const Settings = ({ children }) => {
	const CustomFetch = useFetch();
	const [settings, setSettings] = useState({});

	useEffect(() => {
		(async () => {
			const { data, response } = await CustomFetch({
				url: `setting/${SETTINGS_ID}`,
				returnResponse: true,
			});
			if (!response.ok) {
				// TODO: Redirect to not found page
			}
			setSettings(data.data);
			console.log(data.data);
		})();
	}, []);

	return (
		<SettingsProvider.Provider value={settings}>
			{children}
		</SettingsProvider.Provider>
	);
};

export default Settings;
