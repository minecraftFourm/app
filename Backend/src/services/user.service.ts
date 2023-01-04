import { StatusCodes } from "http-status-codes"
import prisma from "../db/prisma.client"
import CustomError from "../middlewears/custom-error"
import { Req } from "./post.service"

export const generalUserSelect = {
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

export const handleDeleteUser = async (req: Req) => {
    const { params: { id }, user: { id: currentUser, role: { canRemoveUsers, isAdmin} } } = req

    // * If user is not an admin, or user does not have permission to delete other users, an error is thrown.
    if (!(isAdmin || canRemoveUsers)) throw new CustomError('You do not have permission to delete this users.', StatusCodes.UNAUTHORIZED)

    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            role: {
                select: {
                    isStaff: true
                }
            }
        }
    })
    
    //! To delete a staff member, you need to be an admin.
    // * If the user being deleted is a staff member, and the user trying to delete this staff member is not an admin, an error is thrown.
    if (user?.role.isStaff && !isAdmin) throw new CustomError('You do not have permission to delete this user.', StatusCodes.UNAUTHORIZED)

    const deletedUser = await prisma.user.delete({
        where: { id }
    })

    return
}

export const handleGetAllUsers = async (req: Req) => {
    const { username, email, role, roleId, jump } = req.body;

    const users = await prisma.user.findMany({
        where: {
            username: {
                contains: username,
                mode: 'insensitive'
            },
            email: {
                contains: email,
                mode: 'insensitive'
            },                
            role: {
                ...role,
            },
            roleId: {
                equals: roleId
            }
        },
        skip: jump,
        select: {
            id: true,
            username: true,
            email: true,
            profilePicture: true,
            bio: true,
            created: true,
            followers: {
                select: {
                    user: {
                        select: generalUserSelect
                    }
                }
            },
            following: {
                select: {
                    user: {
                        select: generalUserSelect
                    }
                }
            },
            post: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    comments: true,
                    updated: true,
                    reactions: true,
                    category: true
                }
            },
            role: {
                select: {
                    id: true,
                    title: true,
                    color: true,
                    isStaff: true,
                }
            },
        }
    })

    return users;
}