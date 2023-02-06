import React, { useRef, useState } from "react";
import { io } from "socket.io-client";

const Rulespage = () => {
	const inputRef = useRef();
	const [message, setMessage] = useState("");
	const socket = io.connect("http://localhost:5000", {
		transports: ["websocket"],
	});

	const handleSendMessage = (e) => {
		e.preventDefault();
		socket.emit("message", message);
	};

	return (
		<div>
			Rulespage
			<form action="" onSubmit={handleSendMessage}>
				<button className="bg-violet-500 block mx-auto" type="submit">
					Send Message to backend
				</button>
				<input
					type="text"
					name=""
					id=""
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className="border"
				/>
			</form>
		</div>
	);
};

export default Rulespage;
