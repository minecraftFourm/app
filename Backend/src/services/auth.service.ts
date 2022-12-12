import prisma from "../db/prisma.client"
import crypto from 'crypto'
import * as argon from 'argon2';
import jwt from 'jsonwebtoken'
import { Request, Response } from "express";
import { EMAIL_PATTERN, PASSWORD_PATTERN, USERNAME_PATTERN } from "../config";

type UserBody = {
    username: string
    password: string
    email: string
}

type LoginBody = {
    email: string
    password: string
}

const jwt_generator = (id: string, res: Response) => {
    const payload = {_id: id}
    const jwt_key =  process.env.JWT_SECRET_KEY as string
    
    const accessToken = jwt.sign(payload, jwt_key, {expiresIn: '15m'})
    const refreshToken = jwt.sign(payload, jwt_key)

    res.cookie('rt', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    })

    return accessToken
}


export const loginUser = async (auth: LoginBody, res: Response) => {
    const {email, password } = auth

    try{
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("Email not found")
        }

        if(!await argon.verify(user.password, password)) {
            throw new Error("Password is incorrect")
        }

        const token = jwt_generator(user.id, res)

        return {
            ...user,
            token
        }
    } catch(e: any) {
        return {
            message: e.message
        }
    }
}

export const createUser = async (user: UserBody, res: Response) => {
    let { username, password, email } = user

    const validateUsername = USERNAME_PATTERN.test(username);
	const validateEmail = EMAIL_PATTERN.test(email);
	const validatePassword = PASSWORD_PATTERN.test(password);
    
	// * Checks if a real email, good password and solid username has been provided using Regex patterns I copied from the world wide web.
	if (!validateUsername) throw new Error("Invalid Username.");
	if (!validatePassword) throw new Error("Invalid Password.");
	if (!validateEmail) throw new Error("Invalid Email.");

    const salt = crypto.randomBytes(128)
    password = await argon.hash(password, { salt })
    
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password,
                email
            }
        })

       const token = jwt_generator(user.id, res)

        return {
            ...user,
            token
        }

    } catch(e: any) {
       return {
        message: e.message
       }
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
            throw new Error("Invalid Token")
        }
    
        const user = await prisma.user.findUnique({
            where: {
                id: decoded._id
            }
        })
    
        if(!user){
            throw new Error("User not found")
        }
    
        const token = jwt_generator(user.id, res)
    
        return {
            ...user,
            token
        }
    } catch(e: any){
        return {
            message: e.message
        }
    }
}