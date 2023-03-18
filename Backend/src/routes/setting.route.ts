import { Router } from "express";
import { getSetting, getSettings } from "../controllers/setting.controller";
import wrapper from "../middlewears/async-wrapper";
import auth from "../middlewears/auth";

export const settingRouter = Router();

settingRouter.route("/").get(wrapper(getSettings));

settingRouter.route("/:id").get(wrapper(getSetting));
