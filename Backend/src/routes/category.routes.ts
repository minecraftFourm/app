import { createCategory, deleteCategory, editCategory, getCategories, getCategory } from "../controllers/category.controller";
import wrapper from "../middlewears/async-wrapper";
import auth from "../middlewears/auth";

const { Router } = require('express');
export const categoryRouter = Router();


categoryRouter.route('/')
    .get(wrapper(getCategories))
    .post(auth, wrapper(createCategory))

categoryRouter.route('/:id')
    .delete(auth, wrapper(deleteCategory))
    .get(wrapper(getCategory))
    .patch(auth, wrapper(editCategory))