import { Request, Response, NextFunction } from "express";
import CustomError from "./custom-error";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import jwt from "jsonwebtoken";
import { jwt_generator } from "../services/auth.service";

interface res extends Response {
    user?: object;
}

interface JwtPayload {
    _id: string;
}


const auth = (req: Request, res: res, next: NextFunction) => {    
    let { signedCookies: { RefreshToken: refreshToken }, cookies: { Authorization: accessToken } } = req;

    if ((!accessToken || !accessToken.startsWith("Bearer ") || !refreshToken )) {
        throw new CustomError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED)
    } // invalid tokens

    accessToken = accessToken.split(" ")[1]
    try {
        const { _id } = jwt.verify(accessToken, process.env.JWT_SECRET_KEY as string) as JwtPayload
        // console.log('accessToken')
        res.user = { _id }
        return next()
    } catch (error: any) {
        console.log(error.name)
        if (error.name === "TokenExpiredError") {
            const { _id } = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY as string) as JwtPayload
            // console.log('refreshToken')
            // TODO: check db if this is the right token before proceeding.
            jwt_generator(_id, res) // Generates new refresh and access token.
            res.user = { _id }
            return next()
        }
    }

    throw new CustomError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED)
}

export default auth