import { StatusCodes } from "http-status-codes"
import prisma from "../db/prisma.client"
import CustomError from "../middlewears/custom-error"
import { Req } from "./post.service"
const cloudinary = require('cloudinary').v2;

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

type pictureStats = {
    url?: string
    public_id?: string
}

export const handleDeleteUser = async (req: Req) => {
    const { params: { id }, user: { id: currentUser, role: { canRemoveUsers, isAdmin } } } = req

    // * If user is not an admin, or user does not have permission to delete other users, an error is thrown.
    if (!(isAdmin || canRemoveUsers) || !(id === currentUser)) throw new CustomError('You do not have permission to delete this users.', StatusCodes.UNAUTHORIZED)

    // ! An option in the config where users can delete themselves or not

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
    const { username, email, role, roleId, jump = 0 } = req.query;

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
        skip: Number(jump),
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

export const handleEditUser = async (req: Req) => {
    const { params: { id }, body: { role: roleId, bio, email, profilePicture, username }, user: { profilePictureId, id: userId, role: { canEditUsers, isAdmin } } } = req

    // * Checks if the user can edit user, or if the user is an admin.
    // * Or if the current user is the owner of the account being edited.
    if (!(userId === id) || !(canEditUsers || isAdmin)) throw new CustomError('You do not have permission to edit this user.', StatusCodes.UNAUTHORIZED)

    // TODO: delete the previous user's profile picture if possible.
    let profilePictureInfo: pictureStats = {};
    if (profilePicture) {
        const options = {
            use_filename: true,
            unique_filename: true,
            overwrite: false,
            folder: '/profile-pictures'
          };
      
          try {
            // * Upload the image, and get the url
            const result = await cloudinary.uploader.upload(profilePicture, options);

            // * Delete previous profile picture
            if (profilePictureId) {
                await cloudinary.api.delete_resources([profilePictureId])
            }

            profilePictureInfo = {
                url: result.secure_url,
                public_id: result.public_id
            }
          } catch (error) {
            console.error(error);
            throw new CustomError("Error uploading profile picture", StatusCodes.BAD_REQUEST)
          }
    }

    const user = await prisma.user.update({
        where: {
            id
        },
        data: {
            bio, 
            email,
            username,
            profilePicture: profilePictureInfo.url,
            profilePictureId: profilePictureInfo?.public_id,
            roleId 
        },
        select: generalUserSelect
    })

    return user
}

export const handleGetUser = async ( id: string ) => {

    const user = await prisma.user.findUnique({
        where: { id },
        select: generalUserSelect
    })

    return user
}