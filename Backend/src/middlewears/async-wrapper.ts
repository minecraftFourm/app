import { NextFunction, Request, Response } from "express";

const wrapper = (fn: Function) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res);
		} catch (error) {
			next(error);
		}
	};
};


export default wrapper;