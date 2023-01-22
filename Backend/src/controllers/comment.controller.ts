import { Role } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../db/prisma.client";
import CustomError from "../middlewears/custom-error";
import { handleCreateComment, handleDeleteComment, handleEditComment, handleGetComment, handleGetComments } from "../services/comment.service";

interface Req extends Request {
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
        role?: {

        },
        postId: string
        updated: string
        created: string
        sort: "asc" | "desc"
        roleId?: string
    },
    params: {
        id: string
    }
}

export const getComment = async (req: Req, res: Response) => {
    const { params: { id } } = req

    const comment = await handleGetComment(id)
    res.json({ message: "success", data: comment }).status(StatusCodes.OK)
}

export const editComment = async (req: Req, res: Response) => {
    const { params: { id }, user: { id: userId, role: { isAdmin, canEditComment, canEditOtherComment } } } = req

    const comment = await prisma.comment.findUnique({
        where: { id },
        select: {
            userId: true
        }
    })

    if (!comment) throw new CustomError("This comment does not exist.", StatusCodes.NOT_FOUND)

    if (!((comment.userId === userId && canEditComment) || isAdmin || canEditOtherComment)) throw new CustomError("You do not have permission to edit this comment.", StatusCodes.UNAUTHORIZED)
    
    const editComment = await handleEditComment(req)
    
    res.json({ message: "success", data: editComment }).status(StatusCodes.OK)
}

export const getComments = async (req: Req, res: Response) => {
    // TODO: add support for query parameters.
    const comment = await handleGetComments(req)
    res.json({ count: comment.length, data: comment })
}

export const createComment = async (req: Req, res: Response) => {
    const { body: { postId, content }, user: { id: userId, role: { isAdmin, canCreateComment } } } = req

    if (!postId) throw new CustomError("postId is required.", StatusCodes.BAD_REQUEST)
    if (!content) throw new CustomError("content is required.", StatusCodes.BAD_REQUEST)

    if (!(isAdmin || canCreateComment)) throw new CustomError("You do not have permission to create a comment.", StatusCodes.UNAUTHORIZED)
    const comment = await handleCreateComment({ postId, content, userId })

    res.json({ message: "success", data: comment })
}

export const deleteComment = async (req: Req, res: Response) => {
    const comment = await handleDeleteComment(req)
    res.json({ message: "success" }).status(StatusCodes.OK)
}