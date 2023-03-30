import { Router } from "express";
import {
	deleteUser,
	editUser,
	followUser,
	getUser,
	getUsers,
} from "../controllers/user.controller";
import wrapper from "../middlewears/async-wrapper";
import auth from "../middlewears/auth";

export const userRouter = Router();

userRouter.route("/").get(wrapper(getUsers));

userRouter.route("/follow").patch(auth, wrapper(followUser));
userRouter
	.route("/:id")
	.get(wrapper(getUser))
	.patch(auth, wrapper(editUser))
	.delete(auth, wrapper(deleteUser));

// TODO: Admin only route
