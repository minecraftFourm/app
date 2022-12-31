import { createCategory, deleteCategory, editCategory, getCategories, getCategory } from "../controllers/category.controller";
import wrapper from "../middlewears/async-wrapper";

const { Router } = require('express');
export const categoryRouter = Router();


categoryRouter.route('/')
    .get(wrapper(getCategories))
    .post(wrapper(createCategory))

categoryRouter.route('/:id')
    .delete(wrapper(deleteCategory))
    .get(wrapper(getCategory))
    .patch(wrapper(editCategory))