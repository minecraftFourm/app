import { Router } from "express";
import {
	createBanner,
	getBanner,
	getBanners,
} from "../controllers/banner.controller";
import { getSetting, getSettings } from "../controllers/setting.controller";
import wrapper from "../middlewears/async-wrapper";
import auth from "../middlewears/auth";

export const bannerRouter = Router();

bannerRouter.route("/").get(wrapper(getBanners)).post(wrapper(createBanner));

bannerRouter.route("/:id").get(wrapper(getBanner));
