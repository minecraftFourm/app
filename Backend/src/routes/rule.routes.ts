import { Router } from "express";
import {
	createRule,
	deleteRule,
	editRule,
	getRule,
	getRules,
} from "../controllers/rule.controller";
import wrapper from "../middlewears/async-wrapper";
import auth from "../middlewears/auth";

export const rulesRouter = Router();

rulesRouter.route("/").get(wrapper(getRules)).post(auth, wrapper(createRule));

rulesRouter
	.route("/:id")
	.get(auth, wrapper(getRule))
	.patch(auth, wrapper(editRule))
	.delete(auth, wrapper(deleteRule));
