import wrapper from "../middlewears/async-wrapper";
import { Router } from 'express';
import auth  from "../middlewears/auth";
import { createComment, deleteComment, editComment, getComment, getComments } from "../controllers/comment.controller";

export const commentRouter = Router();

commentRouter.route('/')
    .get(wrapper(getComments))
    .post(auth, wrapper(createComment))

commentRouter.route('/:id')
    .get(wrapper(getComment))
    .patch(auth, wrapper(editComment))
    .delete(auth, wrapper(deleteComment))