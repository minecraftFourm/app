import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../db/prisma.client";
import CustomError from "../middlewears/custom-error";

export interface Req extends Request {
    user: {
        id: string
        role: string
    },
    query: {
        title: string | undefined
        page: string | undefined
        limit: string | undefined
        category: string | undefined
    }
}

export const createPost = async (req: Req, res: Response) => {
    const { body: { title, content, category: categoryId }, user: { id } } = req
    
    if ( !title ) throw new CustomError('Post title is missing', StatusCodes.BAD_REQUEST)
    if ( !content ) throw new CustomError('Post content is missing', StatusCodes.BAD_REQUEST)
    if ( !categoryId ) throw new CustomError('Post category is missing', StatusCodes.BAD_REQUEST)

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
        const { id } = req.params

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
            }
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