import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { HEX_PATTERN } from "../config"
import prisma from "../db/prisma.client"
import CustomError from "../middlewears/custom-error"
import { Req } from "../services/post.service"
import { createNewRole, deleteRoles, getAllRoles, getRolesById, updateRoles } from "../services/role.service"

export const createRole = async (req: Req, res: Response) => {
    const { body: { color, title }, user: { role: { canCreateRole, isAdmin } } } = req

    if(!HEX_PATTERN.test(color)) throw new CustomError("Invalid color format, only supports hex formatting.", StatusCodes.BAD_REQUEST)
    if (!(canCreateRole || isAdmin)) throw new CustomError("You do not have permission to create roles.", StatusCodes.UNAUTHORIZED)
    const role = await createNewRole({color, title})

    res.json({ message: 'success', data: role }).status(StatusCodes.CREATED)
}

export const getRoles = async (req: Request, res: Response) => {
    const roles = await getAllRoles()
    return res.json({ count: roles.length, data: roles }).status(StatusCodes.OK)
}

export const getRole = async (req: Request, res: Response) => {
    const { id } = req.params

    const role = await getRolesById(id)

    if(!role) throw new CustomError("Role not found", StatusCodes.NOT_FOUND)

    return res.json({ message: 'success', data: role }).status(StatusCodes.OK)
}

export const editRole = async (req: Req, res: Response) => {
    const { params: { id }, body, user: { role: { canEditRole, isAdmin } } } = req
    
    if (!(canEditRole || isAdmin)) throw new CustomError("You do not have permission to edit this role.", StatusCodes.UNAUTHORIZED)
    const updatedRole = await updateRoles({id, ...body})
    res.json({ message: 'success', updatedRole }).status(StatusCodes.CREATED)
}

export const deleteRole = async (req: Req, res: Response) => {
    const { params: { id }, user: { role: { canDeleteRole, isAdmin } } } = req;

    if (!(canDeleteRole || isAdmin)) throw new CustomError("You do not have permission to edit this role.", StatusCodes.UNAUTHORIZED)
    await deleteRoles(id)
    res.json({ message: 'success' }).status(StatusCodes.NO_CONTENT)
}
