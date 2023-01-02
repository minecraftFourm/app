import { Router } from 'express';
import { createRole, deleteRole, editRole, getRole, getRoles } from '../controllers/role.controller';
import wrapper from '../middlewears/async-wrapper';
import auth from '../middlewears/auth';

export const rolesRouter = Router();

rolesRouter.route('/')
    .get(wrapper(getRoles))
    .post(auth, wrapper(createRole)) 

rolesRouter.route('/:id')
    .get(wrapper(getRole))
    .patch(auth, wrapper(editRole))
    .delete(auth, wrapper(deleteRole))