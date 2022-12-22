import e, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../db/prisma.client";
import CustomError from "../middlewears/custom-error";

export interface Req extends Request {
    user: {
        id: string
        role: string
    },
    query: {
        title: string | undefined,
        page: string | undefined
        limit: string | undefined
    }
}

export const getAnnouncements = async (req: Req, res: Response) => {
    // TODO: adding pages, limits, skips, and search 
    let { title, page, limit } = req.query

    // title = String(title)

    const announcement = await prisma.announcement.findMany({
        where: {
            title: {
                contains: title,
                mode: 'insensitive'
            }
        },
        include: {
            owner: {
                select: {
                    username: true,
                    email: true,
                    role: true,
                    created: true
                }
            },
            comments: {
                select: {
                    id: true,
                    comment: true,
                    created: true,
                    updated: true
                }
            }
        },
        orderBy: {
            updated: 'desc',
        },
        take: Number(limit) > 100 ? 50 : Number(limit)  || 5 
        // TODO: add an option in config.ts file for default limit.
    })

    res.json({count: announcement.length, data: announcement})
};

export const getAnnouncement = async (req: Req, res: Response) => {
    const { id } = req.params

    if (!id) throw new CustomError("Missing Id", StatusCodes.BAD_REQUEST)

    const announcement = await prisma.announcement.findUnique({
        where: { id },
        include: {
            owner: {
                select: {
                    username: true,
                    email: true,
                    role: true,
                    created: true
                }
            },
            comments: {
                select: {
                    id: true,
                    comment: true,
                    created: true,
                    updated: true
                }
            }
        }
    })
    if (!announcement) throw new CustomError("Could not find announcement.", StatusCodes.BAD_REQUEST)

    res.json({message: 'success', data: announcement})
}

export const createAnnouncement = async (req: Req, res: Response) => {
    const { body: { title, content }, user: { id } } = req

    if ( !title ) throw new CustomError('Announcement title is missing', StatusCodes.BAD_REQUEST)
    if ( !content ) throw new CustomError('Announcement content is missing', StatusCodes.BAD_REQUEST)

    const newAnnouncement = await prisma.announcement.create({
        data: {
            title,
            content,
            ownerId: id,
        }
    })

    res.json({message: 'success', data: newAnnouncement})
}

export const editAnnouncement = async (req: Request, res: Response) => {
    // TODO: Add roles permissions support
    const { params: { id }, body: { title, content } } = req
    
    try {
        const announcement = await prisma.announcement.update({
            where: { id },
            data: {
                title,
                content
            }
        })    

        return res.json({message: 'success', announcement})
    } catch (error: any) {
        if (error.code !== 'P2025') {
            throw new CustomError('Something went wrong while trying to edit the announcement.', StatusCodes.INTERNAL_SERVER_ERROR) 
        }
        else {
             throw new CustomError("Could not find announcement.", StatusCodes.BAD_REQUEST)
        }
    }
}

export const deleteAnnouncement = async (req: Req, res: Response) => {
    // TODO: Add roles permissions support
    const { id } = req.params

    if (!id) throw new CustomError("Missing Id", StatusCodes.BAD_REQUEST)

    try {
        const announcement = await prisma.announcement.delete({
            where: {
                id
            }
        })

    } catch (error: any) {
        if (error.code !== 'P2025') {
            throw new CustomError('Something went wrong while trying to delete the announcement.', StatusCodes.INTERNAL_SERVER_ERROR) 
        }
        else {
             throw new CustomError("Could not find announcement.", StatusCodes.BAD_REQUEST)
        }
    }

    res.json({ message: 'success' })
};


// const s = await prisma.announcementComments.create({
    //     data: {
    //         comment: "Howdy!",
    //         announcementId: "632fc07f-1f29-46c1-83ab-124b91199cef",
    //     }
    // })
    // const s = await prisma.user.findUnique({
    //     where: {
    //         id: "4a4dd056-d159-4707-8bf4-b3008bdbaf1c"
    //     },
    //     include: {
    //         Announcements: true,
    //         post: true
    //     }
    // })
    // console.log(s)
    