import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../db/prisma.client";
import CustomError from "../middlewears/custom-error";
import { Req } from "../services/post.service";

export const getCategories = async (req: Req, res: Response) => {
	const categories = await prisma.mainCategory.findMany({
		where: {},
		orderBy: {
			priority: "asc",
		},
	});
	res.json({ count: categories.length, data: categories });
};

export const getCategory = async (req: Req, res: Response) => {
	const { id } = req.params;

	const category = await prisma.mainCategory.findUnique({
		where: {
			id: id,
		},
	});

	if (!category)
		throw new CustomError("Category not found", StatusCodes.NOT_FOUND);
	res.json({ status: "success", data: category });
};

export const createCategory = async (req: Req, res: Response) => {
	const {
		body: { title, priority },
		user: {
			role: { isAdmin, canCreateCategory },
		},
	} = req;

	if (!title)
		throw new CustomError("Title is required", StatusCodes.BAD_REQUEST);
	if (!priority)
		throw new CustomError("Priority is required", StatusCodes.BAD_REQUEST);

	if (!(isAdmin || canCreateCategory))
		throw new CustomError(
			"You do not have permission to create categories.",
			StatusCodes.UNAUTHORIZED
		);

	const category = await prisma.mainCategory.create({
		data: {
			title,
			priority,
		},
	});

	res.status(StatusCodes.CREATED).json({ status: "success", data: category });
};

export const deleteCategory = async (req: Req, res: Response) => {
	const {
		user: {
			role: { isAdmin, canDeleteCategory },
		},
		params: { id },
	} = req;

	if (!(isAdmin || canDeleteCategory))
		throw new CustomError(
			"You do not have permission to delete categories.",
			StatusCodes.UNAUTHORIZED
		);
	try {
		const category = await prisma.mainCategory.delete({
			where: {
				id,
			},
		});
	} catch (error: any) {
		if (error.code === "P2025") {
			throw new CustomError(
				"Category does not exist.",
				StatusCodes.NOT_FOUND
			);
		} else {
			throw new CustomError(
				error.message,
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		}
	}

	res.status(StatusCodes.OK).json({ status: "success" });
};

export const updateCategory = async (req: Req, res: Response) => {
	const {
		params: { id },
		body: { priority, title },
		user: {
			role: { isAdmin, canEditCategory },
		},
	} = req;

	if (!(isAdmin || canEditCategory))
		throw new CustomError(
			"You do not have permission to edit category.",
			StatusCodes.UNAUTHORIZED
		);

	const category = await prisma.mainCategory.update({
		where: {
			id,
		},
		data: {
			priority,
			title,
		},
	});

	res.status(StatusCodes.CREATED).json({ status: "success", data: category });
};
