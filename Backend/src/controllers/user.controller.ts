import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../db/prisma.client";
import CustomError from "../middlewears/custom-error";
import { Req } from "../services/post.service";
import { generalUserSelect, handleDeleteUser, handleGetAllUsers } from "../services/user.service";
const cloudinary = require('cloudinary').v2;

type pictureStats = {
    url?: string
    public_id?: string
}

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
    const { params: { id }, body: { role: roleId, bio, email, profilePicture, username }, user: { profilePictureId } } = req

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
            roleId: roleId
        },
        select: generalUserSelect
    })

    return res.json({ message: "success", data: user })
}

export const deleteUser = async (req: Req, res: Response) => {
    const user = handleDeleteUser(req)
    return res.json({ message: 'success' })
}
