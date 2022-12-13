import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const errorHandler = (err: any, req: Request, res: Response, next: any) => {
    console.log(err.name)
    res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR).json({err: err.message});
}

export default errorHandler;