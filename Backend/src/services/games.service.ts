import { StatusCodes } from 'http-status-codes'
import prisma from '../db/prisma.client'
import CustomError from '../middlewears/custom-error'

interface GameBody {
    title: string
    description: string
    previewImg: string
    tags: string[]
    statsLink: string
}

interface GameBodyWithId extends GameBody {
    id?: string
}


export const createGames= async (create: GameBody) => {
    const game = prisma.game.create({
        data: {
            ...create
        }
    })

    return game
}


export const getAllGames = async () => {
    const games = await prisma.game.findMany()
    
    return games
}

export const getGameById = async (id: string) => {

    const game = await prisma.game.findUnique({
        where: { id }
    })

    if (!game) throw new CustomError("Game not found", StatusCodes.NOT_FOUND)
    return game
}

export const updateGame = async ({id, ...body}: GameBodyWithId) => {

    const game = await getGameById(id!)

    if(!game) throw new CustomError("Game not found", StatusCodes.NOT_FOUND)

    const updatedGame = await prisma.game.update({
        where: { 
            id: game.id
        },
        data: {
            ...body
        }
    })

    return updatedGame
}

export const deleteGame = async (id: string) => {
    try {
        const game = await prisma.game.delete({
            where: {
                id
            }
        })   
        

    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new CustomError("Could not find Game.", StatusCodes.BAD_REQUEST)
        }
        else {
            throw new CustomError('Something went wrong while trying to delete this game.', StatusCodes.INTERNAL_SERVER_ERROR) 
        }
    } 
}