import {Request, Response} from 'express'
import {createUser, loginUser, logoutUser, refreshToken} from '../services/auth.service'


export const registerUser = async (req: Request, res: Response) => {
        const {username, password, email} = req.body
        const user = await createUser({username, password, email}, res)
        res.status(201).send(user)
}

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