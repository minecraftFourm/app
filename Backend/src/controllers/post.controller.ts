import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../db/prisma.client";
import CustomError from "../middlewears/custom-error";
import { Role } from "@prisma/client";

export interface Req extends Request {
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

export const createPost = async (req: Req, res: Response) => {
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

    res.json({message: 'success', data: newPost})
}

export const deletePost = async (req: Req, res: Response) => {
        // TODO: Add roles permissions support
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
    
        } catch (error: any) {
            if (error.code === 'P2025') throw new CustomError("Could not find post.", StatusCodes.BAD_REQUEST)
            
            else {
                throw new CustomError('Something went wrong while trying to delete this post.', StatusCodes.INTERNAL_SERVER_ERROR) 
            }
        }
    
        res.json({ message: 'success' })
}

export const editPost = async (req: Req, res: Response) => {
    // TODO: Add roles permissions support
    const { params: { id }, body: { title, content, category: categoryId } } = req

    const post = await prisma.post.update({
        where: { id },
        data: {
            title,
            content,
            categoryId,
        }
    })
    return res.json({ message: 'success', data: post})
}

export const getPost = async (req: Req, res: Response) => {
    const { id } = req.params
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
            reactions: true
        }
    })
    
    if (!post) throw new CustomError("Could not find post.", StatusCodes.BAD_REQUEST)

    res.json({message: 'success', data: post})
}

export const getAllPosts = async (req: Req, res: Response) => {
    let { title, page, limit, category } = req.query

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
        orderBy: {
            updated: 'desc',
        },
        take: Number(limit) > 100 ? 50 : Number(limit)  || 5 
        // TODO: add an option in config.ts file for default limit.
    })

    res.json({count: post.length, data: post})
}

// TODO: Handle this in a better way.
export const like = async (req: Req, res: Response) => {
    const { params: { id: postId }, user: { id: userId } } = req
    console.log(userId)

    const post = await prisma.post.update({
        where: { id: postId },
        data: {
            reactions: {
                upsert: {
                    create: {
                        userId: userId,
                        type: "Like",
                    },
                    update: {
                        type: "Like"
                    },
                    where: {
                        userId_postId: {
                            userId: userId,
                            postId: postId
                        }
                    }
                }
            }
        },
        include: {
            reactions: true,
        }
    })

    res.json(post)
}   

export const unlike = async (req: Req, res: Response) => {
    const { params: { id: postId }, user: { id: userId } } = req
    console.log(userId)

    const post = await prisma.post.update({
        where: { id: postId },
        data: {
            reactions: {
                upsert: {
                    create: {
                        userId: userId,
                        type: "Unlike",
                    },
                    update: {
                        type: "Unlike"
                    },
                    where: {
                        userId_postId: {
                            userId: userId,
                            postId: postId
                        }
                    }
                }
            }
        }
    })

    res.json(post)
}   