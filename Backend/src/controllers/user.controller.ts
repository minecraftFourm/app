import { Request, Response } from "express";
import prisma from "../db/prisma.client";

export const getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            email: true,
            profilePicture: true,
            bio: true,
            created: true,
            followers: true,
            following: true,
            post: true,
            role: true
        }
    })

    res.json({message: 'success', data: users})
}

export const editUser = async (req: Request, res: Response) => {
    const { params: { id }, body: { roleId } } = req

    const user = await prisma.user.update({
        where: {
            id
        },
        data: {
            roleId: roleId
        },
        select: {
            id: true,
            username: true,
            email: true,
            profilePicture: true,
            bio: true,
            created: true,
            followers: true,
            following: true,
            post: true,
            role: true
        }
    })

    return res.json({ message: "success", data: user })
}
