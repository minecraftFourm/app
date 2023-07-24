import { app, port } from "./app";
import prisma from "./db/prisma.client";

// TODO: check if DB URL exists
app.listen(port, () => {
	console.log(`Server running at ${port}`);
});
