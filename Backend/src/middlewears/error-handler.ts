import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-error";
const errorHandler = (err: any, req: Request, res: Response, next: any) => {

    if (err instanceof CustomError) { // To avoid unnecessary error with error codes.
        return res.status(Number(err.code)).json({err: err.message}); 
    }
    console.log(err); 
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err: err.message});
}

export default errorHandler;