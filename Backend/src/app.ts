import express, { Response, Request } from "express";
import * as dotenv from 'dotenv'
import { authRouter } from "./routes/auth.routes";
import { router as postRouter } from "./routes/post.routes";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewears/error-handler";
import auth from "./middlewears/auth";
import { COOKIE_SECRET } from "./config";
import { categoryRouter } from "./routes/category.routes";
import { rolesRouter } from "./routes/roles.route";
import { userRouter } from "./routes/user.routes";
const morgan = require("morgan");
const cors = require("cors");
const cloudinary = require('cloudinary').v2;
dotenv.config()

export const port = process.env.PORT;
export const app = express();

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: false
});

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  }

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json({limit: '100mb'}))
app.use(cookieParser(COOKIE_SECRET))

app.use('/', authRouter);
app.use('/post', postRouter);
app.use('/category', categoryRouter);
app.use('/roles', rolesRouter);
app.use('/user', userRouter);

app.get('/protected', auth, async (req: Request, res: Response) => {
  return res.send("Howdy!")
})

app.use('*', (req, res) => {
    res.json({ err: 'Invalid Request' })
})

app.use(errorHandler);
// app.listen(port, () => {
//     console.log(`Server running at ${port}`);
// });