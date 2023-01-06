import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../db/prisma.client";
import { Req } from "../services/post.service";
import { generalUserSelect, handleDeleteUser, handleEditUser, handleGetAllUsers } from "../services/user.service";


export const getUsers = async (req: Req, res: Response) => {
    const users = await handleGetAllUsers(req)
    res.json({count: users.length, data: users}).status(StatusCodes.OK)
}

export const getUser = async (req: Req, res: Response) => {
    const { id } = req.params

    const user = await prisma.user.findUnique({
        where: { id },
        select: generalUserSelect
    })

    return res.json({ message: 'success', data: user }).status(StatusCodes.OK)
}

export const editUser = async (req: Req, res: Response) => {
    const user = await handleEditUser(req);
    return res.json({ message: "success", data: user }).status(StatusCodes.CREATED)
}

export const deleteUser = async (req: Req, res: Response) => {
    const user = handleDeleteUser(req)
    return res.json({ message: 'success' }).status(StatusCodes.NO_CONTENT)
}
