import express, { Response, Request } from "express";
import * as dotenv from 'dotenv'
import { authRouter } from "./routes/auth.routes";
import { router as announcementRouter } from "./routes/announcement.routes";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewears/error-handler";
import auth from "./middlewears/auth";
import { COOKIE_SECRET } from "./config";
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");
dotenv.config()

const port = process.env.PORT;
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  }

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser(COOKIE_SECRET))

app.use('/', authRouter);
app.use('/announcement', announcementRouter);

app.get('/protected', auth, async (req: Request, res: Response) => {
    return res.json({hey: "Howdy"})
})
app.use('*', (req, res) => {
    res.json({ err: 'Invalid Request' })
})

app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server running at ${port}`);
});