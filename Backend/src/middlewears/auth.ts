import { Request, Response, NextFunction } from "express";
import CustomError from "./custom-error";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import jwt from "jsonwebtoken";
import { jwt_generator } from "../services/auth.service";
import prisma from "../db/prisma.client";
import wrapper from "./async-wrapper";

interface req extends Request {
    user?: object
}

interface JwtPayload {
    id: string;
}

const auth = wrapper(async (req: req, res: Response, next: NextFunction) => {    
    let { signedCookies: { RefreshToken: refreshToken, Authorization: accessToken } } = req;

    if (!(accessToken || refreshToken) ) {
        throw new CustomError(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED)
    } // invalid tokens

    try {
        // Tries to verify user using the access token
        accessToken = accessToken.split(" ")[1]
        const user = jwt.verify(accessToken, process.env.JWT_SECRET_KEY as string) as JwtPayload
        req.user = user
        return next()
    } catch (error: any) {
        // Do nothing, and try using the refresh token to login.
    }

    // Tries to authenticate user using RefreshToken
    console.log('refresh token')
    const userDetails = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY as string) as JwtPayload
    const user = await prisma.user.findUnique({
        where: {
            id: userDetails.id
        },
        select: {
            refreshToken: true,
            username: true,
            id: true,
            role: true,
            email: true
        }
    })
    if (user?.refreshToken !== refreshToken) {
        throw new CustomError("Invalid Token.", StatusCodes.UNAUTHORIZED)
    }
    if (!user) throw new CustomError(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST)
    await jwt_generator({ id: userDetails.id, username: user.username, role: user.role, email: user.email }, res) // Generates new refresh and access token.
    req.user = userDetails
    return next()
})

export default auth