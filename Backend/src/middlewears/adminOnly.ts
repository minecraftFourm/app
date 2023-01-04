import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import CustomError from "./custom-error";

interface Req extends Request {
    user?: {
        role: Role;
    }
} 


export const adminOnly = (req: Req, res : Response, next: NextFunction) => {
    const user = req.user;
    
    if (!user || !user.role.isAdmin) throw new CustomError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED)

    // ! If the user's role is not admin, then they can't access the content...
    next();
}