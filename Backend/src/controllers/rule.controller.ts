import { Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import prisma from "../db/prisma.client";
import CustomError from "../middlewears/custom-error";
import { Req } from "../services/post.service";

export const getRules = async (req: Req, res: Response) => {
	const rules = await prisma.rule.findMany({});
	return res.json({ status: "success", data: rules });
};

export const getRule = async (req: Req, res: Response) => {
	const { id } = req.params;
	const rule = await prisma.rule.findUnique({ where: { id } });

	if (!rule)
		throw new CustomError("Could not find rule.", StatusCodes.BAD_REQUEST);
	return res.json({ status: "success", data: rule });
};

export const createRule = async (req: Req, res: Response) => {
	const {
		params: { id },
		user: { role },
		body: { title, content, description },
	} = req;

	if (!title || !content)
		throw new CustomError(
			"Rule title, and content must be provided.",
			StatusCodes.BAD_REQUEST
		);

	if (!(role.canManageRules || role.isAdmin))
		throw new CustomError(
			ReasonPhrases.UNAUTHORIZED,
			StatusCodes.UNAUTHORIZED
		);

	const rule = await prisma.rule.create({
		data: {
			title,
			content,
			description,
		},
	});
	return res.status(StatusCodes.OK).json({ status: "success", data: rule });
};

export const editRule = async (req: Req, res: Response) => {
	const {
		params: { id },
		user: { role },
		body: { title, content, description },
	} = req;

	if (!(role.canManageRules || role.isAdmin))
		throw new CustomError(
			ReasonPhrases.UNAUTHORIZED,
			StatusCodes.UNAUTHORIZED
		);

	try {
		const rule = await prisma.rule.update({
			where: { id },
			data: {
				title,
				content,
				description,
			},
		});
		return res
			.status(StatusCodes.OK)
			.json({ status: "success", data: rule });
	} catch (error: any) {
		if (error.code === "P2025") {
			throw new CustomError(
				"Could not find rule.",
				StatusCodes.BAD_REQUEST
			);
		} else {
			throw new CustomError(
				"Something went wrong while trying to edit this rule.",
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		}
	}
};

export const deleteRule = async (req: Req, res: Response) => {
	const {
		params: { id },
		user: { role },
	} = req;

	if (!(role.canManageRules || role.isAdmin))
		throw new CustomError(
			ReasonPhrases.UNAUTHORIZED,
			StatusCodes.UNAUTHORIZED
		);

	try {
		await prisma.rule.delete({ where: { id } });
		return res.status(StatusCodes.OK).json({ status: "success" });
	} catch (error: any) {
		if (error.code === "P2025") {
			throw new CustomError(
				"Could not find rule.",
				StatusCodes.BAD_REQUEST
			);
		} else {
			throw new CustomError(
				"Something went wrong while trying to delete this rule page.",
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		}
	}
};
