import { Role } from "@prisma/client"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import prisma from "../db/prisma.client"
import CustomError from "../middlewears/custom-error"
import {createCategory as createC, getCategoryById, deleteCategory as deleteC, updateCategory, getCategories as getC} from '../services/category.service'

interface Req extends Request {
    query: {
        name: string | undefined,
        page: string | undefined
        limit: string | undefined
    },
    user: {
        id: string
        role: Role
    }
}

export const createCategory = async (req: Req, res: Response) => {
    const {canCreateCategory} = req.user.role
    const { name } = req.body

    if (!canCreateCategory) res.json({ message: 'You do not have permission to create a post'}).status(StatusCodes.UNAUTHORIZED)
   

    const newCategory = await createC(name)

    res.json({ message: 'success', data: newCategory }).status(StatusCodes.CREATED)
}

export const deleteCategory = async (req: Req, res: Response) => {
    const {canDeleteCategory} = req.user.role
    const { id } = req.params;
    // TODO: Add permissions check
    const category = await getCategoryById(id)

    if (!category) return res.json({ err: 'Category not found.' }).status(StatusCodes.BAD_REQUEST);

    if(!canDeleteCategory) res.json({ message: 'You do not have permission to delete a post'}).status(StatusCodes.UNAUTHORIZED)

    await deleteC(id)

    res.json({ message: 'success' }).status(StatusCodes.OK)
}

export const getCategory = async (req: Request, res: Response) => {
    const { id } = req.params
    const category = await getCategoryById(id)

    if (!category) throw new CustomError("Could not find post.", StatusCodes.BAD_REQUEST)



    res.json({message: 'success', data: category})
}

export const editCategory = async (req: Req, res: Response) => {
    const {canEditCategory} = req.user.role
    if (!canEditCategory) res.json({ message: 'You do not have permission to create a post'}).status(StatusCodes.UNAUTHORIZED)

    // TODO: Add roles permissions support
    const { params: { id }, body: { name, adminOnly } } = req

    const updatedCategory = await updateCategory({id, name, adminOnly})

    return res.json({ message: 'success', data: updatedCategory})
}

export const getCategories = async (req: Req, res: Response) => {
    let { name, page, limit } = req.query

    const categories = await getC({name, page, limit})
    res.json({count: categories.length, data: categories})
}