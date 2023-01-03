import prisma from "../db/prisma.client"

interface CategoryBodyInput {
    name: string,
    adminOnly: boolean
}

interface CategoryUpdateInput extends CategoryBodyInput{
    id: string
}

interface CategoryParamsBody {
    name?: string,
    limit?: string,
    page?: string
}

export const createCategory = async (name: string) => {
    const newCategory = await prisma.category.create({
        data: {
            name
        }
    })


    return newCategory
}


export const getCategories = async ({name, limit, page}: CategoryParamsBody) => {

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
        take: Number(limit),
        skip: (Number(limit) * (Number(page) - 1))
        
    })

    return category

}

export const getCategoryById = async (id: string) => {
    const category = await prisma.category.findUnique({
        where: { id },
        include: {
            posts: true
        }
    })


    return  category
}


export const updateCategory = async ({id, name, adminOnly}:CategoryUpdateInput) => {
    const category = await prisma.category.update({
        where: { id },
        data: {
            name,
            adminOnly
        }
    })

    return category
}

export const deleteCategory = async (id: string) => {
    await prisma.category.delete({
        where: {
            id
        }
    })

    return 
}