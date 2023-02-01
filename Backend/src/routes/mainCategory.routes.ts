import { Router } from "express";
import {
	createCategory,
	deleteCategory,
	getCategories,
	getCategory,
	updateCategory,
} from "../controllers/mainCategory.controller";
import wrapper from "../middlewears/async-wrapper";
import auth from "../middlewears/auth";

export const mainCategoryRouter = Router();

mainCategoryRouter
	.route("/")
	.get(wrapper(getCategories))
	.post(auth, wrapper(createCategory));

mainCategoryRouter
	.route("/:id")
	.get(wrapper(getCategory))
	.patch(auth, wrapper(updateCategory))
	.delete(auth, wrapper(deleteCategory));
