import wrapper from "../middlewears/async-wrapper";
import { Router } from 'express';
import auth  from "../middlewears/auth";

export const commentRouter = Router();