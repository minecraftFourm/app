import { StatusCodes } from "http-status-codes"
import prisma from "../db/prisma.client"
import CustomError from "../middlewears/custom-error"
import { generalUserSelect } from "./user.service"

interface RoleInputBody {
    id?: string
    color: string,
    title: string
}


export const createNewRole = async ({color, title}: RoleInputBody) => {
    const role = await prisma.role.create({
        data: {
            color,
            title
        }
    })

    return role
}

export const getAllRoles = async () => {
    const role = await prisma.role.findMany({
        include: {
            user: {
                select: generalUserSelect
            }
        }
    })
    
    return role
}

export const getRolesById = async (id: string) => {

    const role = await prisma.role.findUnique({
        where: { id },
        include: {
            user: {
                select: generalUserSelect
            }
        }
    })
    
    return role
}

export const updateRoles = async ({id, ...body}: RoleInputBody) => {

    const role = await getRolesById(id!)

    if(!role) throw new CustomError("Role not found", StatusCodes.NOT_FOUND)

    const updatedRole = await prisma.role.update({
        where: { 
            id: role.id
        },
        data: {
            ...body
        }
    })

    return updatedRole
}

export const deleteRoles = async (id: string) => {
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
}