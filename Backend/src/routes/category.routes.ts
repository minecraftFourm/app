import { Router } from "express";
import { createCategory, deleteCategory, editCategory, getCategories, getCategory } from "../controllers/category.controller";
import { adminOnly } from "../middlewears/adminOnly";
import wrapper from "../middlewears/async-wrapper";
import auth from "../middlewears/auth";

export const categoryRouter = Router();


categoryRouter.route('/')
    .get(wrapper(getCategories))
    .post(auth, adminOnly, wrapper(createCategory))

categoryRouter.route('/:id')
    .delete(auth, adminOnly, wrapper(deleteCategory))
    .get(wrapper(getCategory))
    .patch(auth, adminOnly, wrapper(editCategory))