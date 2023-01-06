import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../db/prisma.client";
import { handleDeletePost, handleEditPost, handleGetAllPost, handleGetPost, handleNewPost } from "../services/post.service";
import { Req } from "../services/post.service";

export const createPost = async (req: Req, res: Response) => {
    const newPost = await handleNewPost(req);
    res.json({message: 'success', data: newPost}).status(StatusCodes.CREATED)
}

export const deletePost = async (req: Req, res: Response) => {
        const post = await handleDeletePost(req);
        res.json({ message: 'success' }).status(StatusCodes.NO_CONTENT)
}

export const editPost = async (req: Req, res: Response) => {
    const post = await handleEditPost(req)
    return res.json({ message: 'success', data: post }).status(StatusCodes.CREATED)
}

export const getPost = async (req: Req, res: Response) => {
    const { id } = req.params
    const post = await handleGetPost({ id })
    res.json({message: 'success', data: post}).status(StatusCodes.OK)
}

export const getAllPosts = async (req: Req, res: Response) => {
    const post = await handleGetAllPost(req);
    res.json({count: post.length, data: post}).status(StatusCodes.OK)
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

    res.json(post).status(StatusCodes.ACCEPTED)
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

    res.json(post).status(StatusCodes.ACCEPTED)
}   