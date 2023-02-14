import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../db/prisma.client";
import { Req } from "../services/post.service";

export const getSettings = async (req: Req, res: Response) => {
	const settings = await prisma.setting.findMany({});
	res.json({ message: "success", data: settings }).status(StatusCodes.OK);
};

export const getSetting = async (req: Req, res: Response) => {
	const { id } = req.params;
	const setting = await prisma.setting.findUnique({ where: { id: id } });
	res.json({ message: "success", data: setting }).status(StatusCodes.OK);
};
