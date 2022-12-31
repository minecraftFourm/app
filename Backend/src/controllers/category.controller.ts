import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import prisma from "../db/prisma.client"
import CustomError from "../middlewears/custom-error"

interface Req extends Request {
    query: {
        name: string | undefined,
        page: string | undefined
        limit: string | undefined
    }
}
export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body
    const newCategory = await prisma.category.create({
        data: {
            name: name
        }
    })
    res.json({ message: 'success', data: newCategory }).status(StatusCodes.CREATED)
}

export const deleteCategory = async (req: Req, res: Response) => {
    const { id } = req.params;
    // TODO: Add permissions check
    const category = await prisma.category.delete({
        where: {
            id
        }
    })

    if (!category) return res.json({ err: 'Category not found.' }).status(StatusCodes.BAD_REQUEST);

    res.json({ message: 'success' }).status(StatusCodes.OK)
}

export const getCategory = async (req: Request, res: Response) => {
    const { id } = req.params
    const category = await prisma.category.findUnique({
        where: { id },
        include: {
            posts: true
        }
    })

    if (!category) throw new CustomError("Could not find post.", StatusCodes.BAD_REQUEST)

    res.json({message: 'success', data: category})
}

export const editCategory = async (req: Req, res: Response) => {
    // TODO: Add roles permissions support
    const { params: { id }, body: { name } } = req

    const post = await prisma.category.update({
        where: { id },
        data: {
            name
        }
    })

    return res.json({ message: 'success', data: post})
}

export const getCategories = async (req: Req, res: Response) => {
    let { name, page, limit } = req.query

    const categories = await prisma.category.findMany({
        where: {
            name: {
                contains: name,
                mode: 'insensitive'
            }
        },
        include: {
            posts: true
        }
    })

    res.json({count: categories.length, data: categories})
}