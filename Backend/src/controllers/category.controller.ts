import { Role } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../db/prisma.client";
import CustomError from "../middlewears/custom-error";
import {
	handleCreateCategory,
	handleDeleteCategory,
	handleGetCategories,
	handleGetCategoryById,
	handleUpdateCategory,
} from "../services/category.service";

interface Req extends Request {
	query: {
		name?: string;
		jump?: string;
		limit?: string;
	};
	user: {
		id: string;
		role: Role;
	};
}

export const createCategory = async (req: Req, res: Response) => {
	const { canCreateCategory, isAdmin } = req.user.role;
	const { name, adminOnly, mainCategoryId } = req.body;

	// * Checks if user is admin, or has permission to create categories.
	if (!(canCreateCategory || isAdmin))
		throw new CustomError(
			"You do not have permission to create a post",
			StatusCodes.UNAUTHORIZED
		);

	// * Checks if the user is trying to create an admin only category, and if so, they must be an admin, if not, an error is thrown.
	if (!(adminOnly && isAdmin))
		throw new CustomError(
			"You do not have permission to create an adminOnly category.",
			StatusCodes.UNAUTHORIZED
		);

	const newCategory = await handleCreateCategory(
		name,
		adminOnly,
		mainCategoryId
	);
	res.json({ message: "success", data: newCategory }).status(
		StatusCodes.CREATED
	);
};

export const deleteCategory = async (req: Req, res: Response) => {
	const { canDeleteCategory, isAdmin } = req.user.role;
	const { id } = req.params;

	// * Checks if user is admin, or has permission to create categories.
	if (!(canDeleteCategory || isAdmin))
		throw new CustomError(
			"You do not have permission to delete a category.",
			StatusCodes.UNAUTHORIZED
		);

	const category = await prisma.category.findUnique({
		where: { id },
		select: {
			adminOnly: true,
		},
	});

	// * If the category is adminOnly, it checks if the user trying to delete it is an admin.
	if (!(category?.adminOnly && isAdmin))
		throw new CustomError(
			"You do not have permission to delete this category.",
			StatusCodes.UNAUTHORIZED
		);

	await handleDeleteCategory(id);
	res.json({ message: "success" }).status(StatusCodes.NO_CONTENT);
};

export const getCategory = async (req: Request, res: Response) => {
	const { id } = req.params;
	const category = await handleGetCategoryById(id);

	if (!category)
		throw new CustomError(
			"Could not find category.",
			StatusCodes.BAD_REQUEST
		);

	res.json({ message: "success", data: category }).status(StatusCodes.OK);
};

export const editCategory = async (req: Req, res: Response) => {
	const {
		params: { id },
		body: { name, adminOnly, mainCategoryId },
		user: {
			role: { isAdmin, canEditCategory },
		},
	} = req;

	// * Checks if the user has permission to edit categories, or if they're an admin.
	if (!(canEditCategory || isAdmin))
		throw new CustomError(
			"You do not have permission to edit this category.",
			StatusCodes.UNAUTHORIZED
		);

	const category = await prisma.category.findUnique({
		where: { id },
		select: {
			adminOnly: true,
		},
	});

	if (!category)
		throw new CustomError(
			"This category does not exist.",
			StatusCodes.NOT_FOUND
		);
	// * If the category is adminOnly, it checks if the user trying to edit it is an admin.
	if (!(category.adminOnly && isAdmin))
		throw new CustomError(
			"You do not have permission to edit this category.",
			StatusCodes.UNAUTHORIZED
		);

	const updatedCategory = await handleUpdateCategory({ id, name, adminOnly, mainCategoryId });

	return res
		.json({ message: "success", data: updatedCategory })
		.status(StatusCodes.CREATED);
};

export const getCategories = async (req: Req, res: Response) => {
	let { name, jump, limit } = req.query;
	const categories = await handleGetCategories({ name, jump, limit });
	res.json({ count: categories.length, data: categories }).status(
		StatusCodes.OK
	);
};
