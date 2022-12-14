import express, { Response, Request } from "express";
import * as dotenv from 'dotenv'
import { authRouter } from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewears/error-handler";
import auth from "./middlewears/auth";
const morgan = require("morgan");

dotenv.config()

const port = process.env.PORT;
const app = express();

app.use(morgan("dev"));
app.use(express.json())
app.use(cookieParser("secret")) // TODO: probably change to a variable, but this needs to be more secured lol
app.use('/', authRouter)
app.get('/protected', auth, (req: Request, res: Response) => {
    return res.json({hey: "Howdy"})
})
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server running at ${port}`);
});