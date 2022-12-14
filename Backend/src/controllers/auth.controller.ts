import {Request, Response, NextFunction} from 'express'
import {createUser, loginUser, logoutUser, /* refreshToken */} from '../services/auth.service'
import { StatusCodes } from 'http-status-codes'


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const {username, password, email} = req.body

    const user = await createUser({username, password, email}, res)
    res.status(StatusCodes.CREATED).json(user)
}

export const signInUser = async (req: Request, res: Response) => {
    const { password, email } = req.body

    const user = await loginUser({email, password}, res)
    return res.status(StatusCodes.ACCEPTED).json(user)
}


export const signOutUser = async (req: Request, res: Response) => {
    logoutUser(res)
    res.json({
        message: "user logged out"
    }).status(StatusCodes.NO_CONTENT)
}

// ! Don't think we need a specific route dedicated to refreshing tokens anymore.
// export const refresh = async (req: Request, res: Response) => {
//     const user = await refreshToken(req, res)
//     res.json({
//         ...user
//     })
// }