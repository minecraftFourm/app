import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import prisma from "../db/prisma.client"
import CustomError from "../middlewears/custom-error"

export const createRole = async (req: Request, res: Response) => {
    const { color, title } = req.body
    // TODO: check if color, and title exists
    const role = await prisma.role.create({
        data: {
            color,
            title
        }
    })

    res.json({ message: 'success', data: role }).status(StatusCodes.CREATED)
}

export const getRoles = async (req: Request, res: Response) => {
    const role = await prisma.role.findMany({
        where: {

        }
    })
    
    return res.json({ count: role.length, data: role })
}

export const getRole = async (req: Request, res: Response) => {
    const { id } = req.params

    const role = await prisma.role.findUnique({
        where: { id },
        include: {
            user: true
        }
    })

    return res.json({ message: 'success', data: role })
}

export const editRole = async (req: Request, res: Response) => {
    const { params: { id }, body } = req

    const role = await prisma.role.update({
        where: { id },
        data: {
            ...body
        }
    })

    res.json({ message: 'success', role })
}

export const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const role = await prisma.role.delete({
            where: {
                id
            }
        })    
    } catch (error: any) {
        if (error.code === 'P2025') {
            throw new CustomError("Could not find post.", StatusCodes.BAD_REQUEST)
        }
        else {
            throw new CustomError('Something went wrong while trying to delete this post.', StatusCodes.INTERNAL_SERVER_ERROR) 
        }
    }

    res.json({ message: 'success' })
}
