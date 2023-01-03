import { Role } from "@prisma/client"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import prisma from "../db/prisma.client"
import CustomError from "../middlewears/custom-error"

interface Req extends Request {
    user: {
        id: string
        role: Role
    },
    query: {
        title: string | undefined
        page: string | undefined
        limit: string | undefined
        category: string | undefined
    }
}

type getPost = {
    id: string
}

export const handleEditPost = async (req: Req) => {
    const { params: { id }, body: { title, content, category: categoryId }, user: { id: ownerId, role: { canEditPost, canEditOtherPost, isAdmin } } } = req

    const post = await prisma.post.findUnique({
        where: { id: id },
        include: {
            category: {
                select: {
                    adminOnly: true
                }
            }
        }
    })
    /* 
        * Checks if the post category is for admin only, and if it is, it checks if the user is an admin or not.
    */
    if (post?.category.adminOnly) {
        if (!isAdmin) {
            throw new CustomError('You do not have permission to edit this post.', StatusCodes.UNAUTHORIZED)
        }
    } 
    
    
    /*  
        *   Checks if the current user is the owner of the post, and has permission to edit it,
        *   Or if the current user can edit other post
        *   Or if the current user is an admin.
    */
    if (!((post?.ownerId === ownerId && canEditPost) || canEditOtherPost || isAdmin)) {
        throw new CustomError('You do not have permission to edit this post.', StatusCodes.UNAUTHORIZED)
    }

    const updatedPost = await prisma.post.update({
        where: { id },
        data: {
            title,
            content,
            categoryId,
        },
        select: {
            id: true,
            title: true,
            content: true,
        }
    })
    
    return updatedPost
}


export const handleGetPost = async ({ id }: getPost) => {

    const post = await prisma.post.findUnique({
        where: { id },
        include: {
            owner: {
                select: {
                    username: true,
                    email: true,
                    role: true,
                    created: true
                }
            },
            comments: {
                select: {
                    id: true,
                    comment: true,
                    created: true,
                    updated: true
                }
            },
            category: true,
            reactions: true
        }
    })   
    if (!post) throw new CustomError("Could not find post.", StatusCodes.BAD_REQUEST)

    return post
}