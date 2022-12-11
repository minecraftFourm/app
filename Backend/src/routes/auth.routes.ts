import { Router } from "express";
import { refresh, registerUser, signInUser, signOutUser } from "../controllers/auth.controller";

export const authRouter = Router()


authRouter.post("/register", registerUser)
authRouter.post("/login", signInUser)
authRouter.post("/logout", signOutUser)
authRouter.post("/refresh", refresh)
