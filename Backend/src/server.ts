import { server, port } from "./app";

// TODO: check if DB URL exists
server.listen(port, () => {
	console.log(`Server running at ${port}`);
});
