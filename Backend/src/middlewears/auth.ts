import { Request, Response, NextFunction } from "express";
import CustomError from "./custom-error";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import jwt from "jsonwebtoken";
import { jwt_generator } from "../services/auth.service";
import prisma from "../db/prisma.client";
import wrapper from "./async-wrapper";

interface res extends Response {
    user?: object;
}

interface JwtPayload {
    _id: string;
}

const auth = wrapper(async (req: Request, res: res, next: NextFunction) => {    
    let { signedCookies: { RefreshToken: refreshToken, Authorization: accessToken } } = req;

    if ((!accessToken || !accessToken.startsWith("Bearer ") || !refreshToken )) {
        throw new CustomError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED)
    } // invalid tokens

    try {
        // Tries to verify user using the access token
        accessToken = accessToken.split(" ")[1]
        const { _id } = jwt.verify(accessToken, process.env.JWT_SECRET_KEY as string) as JwtPayload
        res.user = { _id }
        return next()
    } catch (error: any) {
        console.log(error.name)
        if (error.name !== "TokenExpiredError") {
            throw new CustomError(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    // Tries to authenticate user using RefreshToken
    const { _id } = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY as string) as JwtPayload
    const user = await prisma.user.findUnique({
        where: {
            id: _id
        },
        select: {
            refreshToken: true
        }
    })
    if (user?.refreshToken !== refreshToken) {
        throw new CustomError("Invalid Token.", StatusCodes.UNAUTHORIZED)
    }
    await jwt_generator(_id, res) // Generates new refresh and access token.
    res.user = { _id }
    return next()
})

export default auth