import { Router } from 'express';
import { editUser, getUsers } from '../controllers/user.controller';
import wrapper from '../middlewears/async-wrapper';
import auth from '../middlewears/auth';

export const userRouter = Router();

userRouter.route('/')
    .get(auth, wrapper(getUsers))

userRouter.route('/:id')
    .patch(auth, wrapper(editUser))

// TODO: Admin only route
