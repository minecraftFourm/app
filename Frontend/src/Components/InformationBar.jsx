import React, { useEffect, useState } from "react";
import { useSettings } from "../Contexts/Settings";

const dummyText =
	"We are going under maintenance on Sunday for approximately 3 hours";

const InformationBar = () => {
	// * we should get the show condition and text from api.
	// when the api endpoint is ready
	const settings = useSettings();
	const [info, setInfo] = useState({
		status: false,
		msg: null,
	});
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (settings && settings.infobar.length != 0) {
			setInfo(() => {
				return {
					status: true,
					msg: settings.infobar,
				};
			});
		}
	}, []);

	return info && info.status ? (
		<div className="text-center p-[8px] bg-[#7675FF] text-white">
			{info.msg}
		</div>
	) : (
		<></>
	);
};

export default InformationBar;
