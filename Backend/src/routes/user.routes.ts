import { Router } from 'express';
import { editUser, getUser, getUsers } from '../controllers/user.controller';
import wrapper from '../middlewears/async-wrapper';
import auth from '../middlewears/auth';

export const userRouter = Router();

userRouter.route('/')
    .get(auth, wrapper(getUsers))

userRouter.route('/:id')
    .get(auth, wrapper(getUser))
    .patch(auth, wrapper(editUser))

// TODO: Admin only route
