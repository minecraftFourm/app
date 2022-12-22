import wrapper from "../middlewears/async-wrapper";
import { Router } from 'express';
import { getAnnouncement, getAnnouncements, editAnnouncement, createAnnouncement, deleteAnnouncement } from '../controllers/announcement.controller'
import auth  from "../middlewears/auth";
import adminOnly from "../middlewears/adminOnly";

export const router = Router();

router.route('/')
    .get(wrapper(getAnnouncements))
    .post(auth, adminOnly, wrapper(createAnnouncement))

router.route('/:id')
.get(wrapper(getAnnouncement))
.patch(auth, adminOnly, wrapper(editAnnouncement))
.delete(auth, adminOnly, wrapper(deleteAnnouncement))