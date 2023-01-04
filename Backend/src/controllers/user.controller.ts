import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../db/prisma.client";
import CustomError from "../middlewears/custom-error";
import { Req } from "../services/post.service";
import { generalUserSelect, handleDeleteUser, handleGetAllUsers } from "../services/user.service";
const cloudinary = require('cloudinary').v2;


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

export const editUser = async (req: Request, res: Response) => {
    const { params: { id }, body: { role: roleId, bio, email, profilePicture, username } } = req

    // TODO: delete the previous user's profile picture if possible.
    let profilePictureUrl;
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
            profilePictureUrl = result.secure_url;
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
            profilePicture: profilePictureUrl,
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
