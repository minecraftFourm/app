import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import prisma from "../db/prisma.client"
import CustomError from "../middlewears/custom-error"
import { Req } from "../services/post.service"
import {createGames, getAllGames, getGameById, updateGame, deleteGame as deleteG} from '../services/games.service'

export const createGame = async (req: Req, res: Response) => {
    const { body: { title, description, previewImg, tags, statsLink }, user: { role: { isAdmin } } } = req
    
    if (!(isAdmin)) throw new CustomError("You do not have permission to create games.", StatusCodes.UNAUTHORIZED)
    if (!title) throw new CustomError("Title is required.", StatusCodes.BAD_REQUEST)

    const game = await createGames({ title, description, previewImg, tags, statsLink })
    res.json({ message: 'success', data: game }).status(StatusCodes.CREATED)
}

export const getGames = async (req: Request, res: Response) => {
    const games = await getAllGames()
    return res.json({ count: games.length, data: games }).status(StatusCodes.OK)
}

export const getGame = async (req: Request, res: Response) => {
    const { id } = req.params

    const game = await getGameById(id)

    if(!game) throw new CustomError("Game not found", StatusCodes.NOT_FOUND)

    return res.json({ message: 'success', data: game }).status(StatusCodes.OK)
}

export const editGame = async (req: Req, res: Response) => {
    const { params: { id }, body, user: { role: { isAdmin } } } = req
    
    if (!(isAdmin)) throw new CustomError("You do not have permission to edit this game.", StatusCodes.UNAUTHORIZED)
    const updatedGame = await updateGame({id, ...body})
    res.json({ message: 'success', updatedGame }).status(StatusCodes.CREATED)
}

export const deleteGame = async (req: Req, res: Response) => {
    const { params: { id }, user: { role: {isAdmin } } } = req;

    if (!(isAdmin)) throw new CustomError("You do not have permission to edit this game.", StatusCodes.UNAUTHORIZED)
    await deleteG(id)
    res.json({ message: 'success' }).status(StatusCodes.NO_CONTENT)
}
