import wrapper from "../middlewears/async-wrapper";
import { Router } from 'express';
import auth  from "../middlewears/auth";
import { createPost, deletePost, editPost, getAllPosts, getPost } from "../controllers/post.controller";

export const router = Router();

router.route('/')
    .get(wrapper(getAllPosts))
    .post(auth, wrapper(createPost))

router.route('/:id')
.get(wrapper(getPost))
.patch(auth, wrapper(editPost))
.delete(auth, wrapper(deletePost))