import { Role } from "@prisma/client"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import prisma from "../db/prisma.client"
import CustomError from "../middlewears/custom-error"
import { generalUserSelect } from "./user.service"
export interface Req extends Request {
    user: {
        id: string
        role: Role
        profilePictureId?: string
    },
    query: {
        title?: string 
        jump?: string 
        limit?: string 
        category?: string 
        username?: string
        email?: string
        isStaff?: string
        isAdmin?: string
        roleId?: string
        sort?: "desc" | "asc"
    }
}

type getPost = {
    id: string
}

export const handleNewPost = async (req: Req) => {
    const { body: { title, content, category: categoryId }, user: { id, role: { canPostAdmin, canCreatePost } } } = req

    // * If user does not have permission to create new post.
    if (!canCreatePost) throw new CustomError('You do not have permission to create a post', StatusCodes.UNAUTHORIZED)

    if ( !title ) throw new CustomError('Post title is missing', StatusCodes.BAD_REQUEST)
    if ( !content ) throw new CustomError('Post content is missing', StatusCodes.BAD_REQUEST)
    if ( !categoryId ) throw new CustomError('Post category is missing', StatusCodes.BAD_REQUEST)

    const category = await prisma.category.findUnique({
        where: {
            id: categoryId
        },
        select: {
            adminOnly: true
        }
    })
    
    // * If the category is for admins only, and the user does not have permission to post in adminOnly category, an error will be thrown.
    if (category?.adminOnly) {
        if (!canPostAdmin) throw new CustomError('You do not have permission to post in this category', StatusCodes.UNAUTHORIZED)
    }

    const newPost = await prisma.post.create({
        data: {
            title,
            content,
            categoryId,
            ownerId: id
        },
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
            }
        },
    })

    return newPost
}

export const handleGetAllPost = async (req: Req) => {
    let { title, jump = 0, limit = 0, category } = req.query

    const post = await prisma.post.findMany({
        where: {
            title: {
                contains: title,
                mode: 'insensitive'
            },
            category: {
                name: {
                    contains: category,
                    mode: 'insensitive'
                },
            }
        },
        include: {
            owner: {
                select: generalUserSelect
            },
            comments: {
                select: {
                    id: true,
                    comment: true,
                    created: true,
                    updated: true
                }
            }
        },
        skip: Number(jump),
        orderBy: {
            updated: 'desc',
        },
        take: Number(limit) > 100 ? 50 : Number(limit)  || 5 
        // TODO: add an option in config.ts file for default limit.
    })

    return post
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

export const handleDeletePost = async (req: Req) => {
    const { params: { id }, user: { id: ownerId, role: { canDeletePost, canDeleteOtherPost, isAdmin} } } = req

    const post = await prisma.post.findUnique({
        where: { id },
        select: {
            ownerId: true
        }
    })

    /*  
        Checks if the current user is the owner of the post, and has permission to delete,
        Or if the current user can delete other post
        Or if the current user is an admin.
    */

    if (!((post?.ownerId === ownerId && canDeletePost) || canDeleteOtherPost || isAdmin)) {
        throw new CustomError('You do not have permission to delete this post.', StatusCodes.UNAUTHORIZED)
    }
        
    try {
        const post = await prisma.post.delete({
            where: {
                id
            }
        })

        return post
    } catch (error: any) {
        if (error.code === 'P2025') throw new CustomError("Could not find post.", StatusCodes.BAD_REQUEST)
        
        else {
            throw new CustomError('Something went wrong while trying to delete this post.', StatusCodes.INTERNAL_SERVER_ERROR) 
        }
    }
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