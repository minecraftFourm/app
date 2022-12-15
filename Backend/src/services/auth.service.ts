import prisma from "../db/prisma.client"
import crypto from 'crypto'
import * as argon from 'argon2';
import jwt from 'jsonwebtoken'
import { Request, Response } from "express";
import { ACCESS_TOKEN_EXIPIRY, EMAIL_PATTERN, PASSWORD_PATTERN, REFRESH_TOKEN_EXIPIRY, USERNAME_PATTERN } from "../config";
import CustomError from "../middlewears/custom-error";
import { StatusCodes } from "http-status-codes";

type UserBody = {
    username: string
    password: string
    email: string
}

type LoginBody = {
    email: string
    password: string
}

export const jwt_generator = async (id: string, res: Response) => {
    const payload = {_id: id}
    const jwt_key =  process.env.JWT_SECRET_KEY as string
    
    const accessToken = jwt.sign(payload, jwt_key, {expiresIn: `${ACCESS_TOKEN_EXIPIRY}m`})
    const refreshToken = jwt.sign(payload, jwt_key, {expiresIn: `${REFRESH_TOKEN_EXIPIRY}m`})

    await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          refreshToken: refreshToken,
        },
    }) // Updates the user db with the latest refresh token.

    // res.cookie('rt', refreshToken, {
        // maxAge: 1000 * 60 * 60 * 24 * 7,  
        // * maxAge isn't supported by all browsers
    //     httpOnly: true
    // })

    const date: Date = new Date(); // Now
    res.cookie("RefreshToken", refreshToken, {
        signed: true,
        httpOnly: true,
        expires: new Date(date.setDate(date.getMinutes() + REFRESH_TOKEN_EXIPIRY)), // 30 days from now.
    })

    res.cookie("Authorization", `Bearer ${accessToken}`, {
        expires: new Date(date.setDate(date.getMinutes() + ACCESS_TOKEN_EXIPIRY)), // 15 minutes from now.
        httpOnly: false,
        signed: true
    })

    return
}


export const loginUser = async (auth: LoginBody, res: Response) => {
    const {email, password } = auth
    
        // Validations
        if (!password || !email) throw new CustomError('Please input a valid email, and password.', StatusCodes.BAD_REQUEST);
        if (!EMAIL_PATTERN.test(email)) throw new CustomError('Please input a valid email', StatusCodes.BAD_REQUEST);

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new CustomError("Email not found", StatusCodes.BAD_REQUEST)
        }

        if(!await argon.verify(user.password, password)) {
            throw new CustomError("Invalid Password", StatusCodes.BAD_REQUEST)
        }

        await jwt_generator(user.id, res)

        
        return { id: user.id, username: user.username, email: user.email }
    }

export const createUser = async (user: UserBody, res: Response) => {
    let { username, password, email } = user

    if(!username) throw new CustomError("Missing Username", StatusCodes.BAD_REQUEST)
    const validateUsername = USERNAME_PATTERN.test(username);
	const validateEmail = EMAIL_PATTERN.test(email);
	const validatePassword = PASSWORD_PATTERN.test(password);
    
	// * Checks if a real email, good password and solid username has been provided using Regex patterns I copied from the world wide web.
	if (!validateUsername) throw new CustomError("Invalid Username.", StatusCodes.BAD_REQUEST); 
    // TODO: A weird bug occurs here
	if (!validatePassword) throw new CustomError("Invalid Password.", StatusCodes.BAD_REQUEST);
	if (!validateEmail) throw new CustomError("Invalid Email.", StatusCodes.BAD_REQUEST);

    const salt = crypto.randomBytes(128)
    password = await argon.hash(password, { salt })
    
    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                password,
                email
            }
        })

        await jwt_generator(newUser.id, res)
        
        return { id: newUser.id, username: newUser.username, email: newUser.email }
        
    } catch (error: any) {
        throw new CustomError(error.message, StatusCodes.BAD_REQUEST)
    }
}

export const logoutUser = (res: Response) => {
    res.cookie('rt', '', {
        expires: new Date(0),
        httpOnly: true
    })
}

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const oldToken = req.cookies['rt'];
        const jwt_key =  process.env.JWT_SECRET_KEY as string
    
        const decoded = jwt.verify(oldToken, jwt_key) as { _id: string}
    
        if(!decoded){
            throw new CustomError("Invalid Token", StatusCodes.UNAUTHORIZED)
        }
    
        const user = await prisma.user.findUnique({
            where: {
                id: decoded._id
            }
        })
    
        if(!user){
            throw new CustomError("User not found", StatusCodes.UNAUTHORIZED)
        }
    
        await jwt_generator(user.id, res)
    
        return { ...user }
    } catch(e: any){
        return {
            message: e.message
        }
    }
}