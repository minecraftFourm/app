import { StatusCodes } from "http-status-codes"
import prisma from "../db/prisma.client"
import CustomError from "../middlewears/custom-error"
import { Req } from "./post.service"

type bodyObject = {
    content: string
    postId: string
    userId: string
}

export const handleGetComment = async (id: string) => {
    const comment = await prisma.comment.findUnique({
        where: { id },
    }) 
    if (!comment) throw new CustomError("Could not find comment.", StatusCodes.NOT_FOUND)
    return comment
}

export const handleGetComments = async () => {
    const comment = await prisma.comment.findMany({
        where: {

        }
    })

    return comment
}

export const handleCreateComment = async (body: bodyObject) => {
    const { content, userId, postId } = body
    
    const comment = await prisma.comment.create({
        data: {
            comment: content,
            userId,
            postId
        }
    })

    return comment
}

export const handleDeleteComment = async (req: Req) => {
    const { params: { id }, user: { id: userId , role: { isAdmin, canDeleteComment, canDeleteOtherComment }}} = req
    const comment = await prisma.comment.findUnique({
        where: { id },
        select: {
            userId: true
        }
    })

    if (!comment) throw new CustomError("Comment not found.", StatusCodes.NOT_FOUND)

    if (!((userId === comment.userId && canDeleteComment) || canDeleteOtherComment || isAdmin)) throw new CustomError("You do not have permission to delete this comment.", StatusCodes.UNAUTHORIZED)

    const deleteComment = await prisma.comment.delete({
        where: { id }
    })

    return comment
}