import { Router } from "express";
import { refresh, registerUser, signInUser, signOutUser } from "../controllers/auth.controller";
import wrapper from "../middlewears/async-wrapper";

export const authRouter = Router()


authRouter.post("/register", wrapper(registerUser))
authRouter.post("/login", wrapper(signInUser))
authRouter.post("/logout", wrapper(signOutUser))
authRouter.post("/refresh", wrapper(refresh))
