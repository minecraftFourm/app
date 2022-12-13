import {Request, Response, NextFunction} from 'express'
import {createUser, loginUser, logoutUser, refreshToken} from '../services/auth.service'
import Wrapper from '../middlewears/async-wrapper'
import { StatusCodes } from 'http-status-codes'

export const registerUser = Wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const {username, password, email} = req.body
    const user = await createUser({username, password, email}, res)
    res.status(StatusCodes.CREATED).json(user)
})

export const signInUser = async (req: Request, res: Response) => {
    const { password, email} = req.body
    const user = await loginUser({email, password}, res)
    res.send(user)
}


export const signOutUser = async (req: Request, res: Response) => {
    logoutUser(res)
    res.send({
        message: "user logged out"
    })
}

export const refresh = async (req: Request, res: Response) => {
    const user = await refreshToken(req, res)
    res.send({
        ...user
    })
}