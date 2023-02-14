import { app, port } from "./app";

// TODO: check if DB URL exists
app.listen(port, () => {
	console.log(`Server running at ${port}`);
});
