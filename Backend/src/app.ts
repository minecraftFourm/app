import express, { Response, Request } from "express";
import * as dotenv from "dotenv";
import { authRouter } from "./routes/auth.routes";
import { router as postRouter } from "./routes/post.routes";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewears/error-handler";
import auth from "./middlewears/auth";
import { categoryRouter } from "./routes/category.routes";
import { rolesRouter } from "./routes/roles.route";
import { userRouter } from "./routes/user.routes";
import { commentRouter } from "./routes/comment.routes";
import { mainCategoryRouter } from "./routes/mainCategory.routes";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger-options";
import { StatusCodes } from "http-status-codes";
import { gamesRouter } from "./routes/game.routes";
const morgan = require("morgan");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
dotenv.config();

const http = require("http");
const { Server } = require("socket.io");

export const port = process.env.PORT || 5000;
export const app = express();
export const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket: any) => {
	// console.log("User connected.");
	// socket.on("disconnect", () => {
	// 	console.log("user disconnected.");
	// });

	socket.on("message", function (data: any) {
		console.log(socket.id);
		console.log(data);
		socket.broadcast.emit("message", `${socket.id} said ${data}`);
	});
});

// Return "https" URLs by setting secure: true
cloudinary.config({
	secure: false,
});

const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true,
};

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json({ limit: "100mb" }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/", authRouter);
app.use("/post", postRouter);
app.use("/category", categoryRouter);
app.use("/role", rolesRouter);
app.use("/user", userRouter);
app.use("/comment", commentRouter);
app.use("/game", gamesRouter);
app.use("/mainCategory", mainCategoryRouter);

app.get("/protected", auth, async (req: Request, res: Response) => {
	return res.send("Howdy!");
});
app.use("/game", gamesRouter);

app.get("/protected", auth, async (req: Request, res: Response) => {
	return res.send("Howdy!");
});

app.use("*", (req, res) => {
	res.status(StatusCodes.BAD_REQUEST).json({ err: "Invalid Request" });
});

app.use(errorHandler);
// app.listen(port, () => {
//     console.log(`Server running at ${port}`);
// });
