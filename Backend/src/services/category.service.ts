import { StatusCodes } from "http-status-codes"
import prisma from "../db/prisma.client"
import CustomError from "../middlewears/custom-error"

interface CategoryBodyInput {
    name: string,
    adminOnly: boolean
}

interface CategoryUpdateInput extends CategoryBodyInput{
    id: string
}

interface CategoryParamsBody {
    name?: string
    limit?: string
    jump?: string
}

export const handleCreateCategory = async (name: string) => {
    const newCategory = await prisma.category.create({
        data: {
            name
        }
    })


    return newCategory
}


export const handleGetCategories = async ({name, limit, jump}: CategoryParamsBody) => {

    const category =  await prisma.category.findMany({
        where: {
            name: {
                contains: name?.trim(),
                mode: 'insensitive'
            }
        },
        include: {
            posts: true
        },
        take: limit ? Number(limit) : undefined,
        skip: jump ? Number(jump) : undefined
    })

    return category

}

export const handleGetCategoryById = async (id: string) => {
    const category = await prisma.category.findUnique({
        where: { id },
        include: {
            posts: true
        }
    })
    if (!category) throw new CustomError("User not found", StatusCodes.NOT_FOUND)
    return  category
}


export const handleUpdateCategory = async ({id, name, adminOnly}:CategoryUpdateInput) => {
    const category = await prisma.category.update({
        where: { id },
        data: {
            name,
            adminOnly
        }
    })

    return category
}

export const handleDeleteCategory = async (id: string) => {
    await prisma.category.delete({
        where: {
            id
        }
    })

    return 
}