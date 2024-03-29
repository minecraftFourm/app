import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "http";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import CustomError from "./custom-error";

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err.code === "P2021") {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ err: ReasonPhrases.INTERNAL_SERVER_ERROR });
	} else if (err.code === "P2002") {
		return res.status(StatusCodes.BAD_REQUEST).json({
			err: "Someone already exists with this credentials you've provided.",
		});
	} else if (err instanceof CustomError) {
		// To avoid unnecessary error with error codes.
		return res.status(Number(err.code)).json({ err: err.message });
	}

	return res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.json({ err: err.message });
};

export default errorHandler;
