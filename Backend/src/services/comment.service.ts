import { Role } from "@prisma/client";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../db/prisma.client";
import CustomError from "../middlewears/custom-error";
import { generalUserSelect } from "./user.service";

type bodyObject = {
	content: string;
	postId: string;
	userId: string;
};

interface Req extends Request {
	user: {
		id: string;
		role: Role;
		profilePictureId?: string;
	};
	query: {
		title?: string;
		jump?: string;
		limit?: string;
		category?: string;
		username?: string;
		email?: string;
		role?: {};
		postId: string;
		updated: string;
		created: string;
		sort: "asc" | "desc";
		roleId?: string;
	};
	params: {
		id: string;
	};
}

export const handleGetComment = async (id: string) => {
	const comment = await prisma.comment.findUnique({
		where: { id },
		select: {
			id: true,
			postId: true,
			comment: true,
			created: true,
			updated: true,
			user: {
				select: {
					id: true,
					username: true,
					profilePicture: true,
					role: true,
				},
			},
		},
	});
	if (!comment)
		throw new CustomError("Could not find comment.", StatusCodes.NOT_FOUND);
	return comment;
};

export const handleGetComments = async (req: Req) => {
	const { postId, updated, created, sort } = req.query;

	const comment = await prisma.comment.findMany({
		where: {
			postId,
			updated,
			created,
		},
		orderBy: {
			updated: sort,
		},
		select: {
			comment: true,
			updated: true,
			created: true,
			user: {
				select: {
					id: true,
					username: true,
					profilePicture: true,
					role: true,
				},
			},
			id: true,
		},
	});

	return comment;
};

export const handleCreateComment = async (body: bodyObject) => {
	const { content, userId, postId } = body;

	const comment = await prisma.comment.create({
		data: {
			comment: content,
			userId,
			postId,
		},
	});

	return comment;
};

export const handleEditComment = async (req: Req) => {
	const {
		params: { id },
		body: { comment: content },
	} = req;

	if (!content)
		throw new CustomError(
			"Missing content field.",
			StatusCodes.NOT_ACCEPTABLE
		);

	const comment = await prisma.comment.update({
		where: {
			id,
		},
		data: {
			comment: content,
		},
	});

	return comment;
};

export const handleDeleteComment = async (req: Req) => {
	const {
		params: { id },
		user: {
			id: userId,
			role: { isAdmin, canDeleteComment, canDeleteOtherComment },
		},
	} = req;
	const comment = await prisma.comment.findUnique({
		where: { id },
		select: {
			userId: true,
		},
	});

	if (!comment)
		throw new CustomError("Comment not found.", StatusCodes.NOT_FOUND);

	if (
		!(
			(userId === comment.userId && canDeleteComment) ||
			canDeleteOtherComment ||
			isAdmin
		)
	)
		throw new CustomError(
			"You do not have permission to delete this comment.",
			StatusCodes.UNAUTHORIZED
		);

	const deleteComment = await prisma.comment.delete({
		where: { id },
	});

	return comment;
};
