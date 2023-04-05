import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import prisma from "../db/prisma.client";
import CustomError from "../middlewears/custom-error";
import { Req } from "../services/post.service";
import { generalUserSelect } from "../services/user.service";

export const getBanners = async (req: Req, res: Response) => {
	const banners = await prisma.banner.findMany({
		where: {},
		select: {
			_count: true,
			id: true,
			name: true,
			url: true,
		},
	});
	res.json({ count: banners.length, data: banners });
};

export const getBanner = async (req: Req, res: Response) => {
	const { id } = req.params;
	const banner = await prisma.banner.findUnique({
		where: {
			id: id,
		},
		select: {
			_count: true,
			id: true,
			name: true,
			url: true,
			user: {
				select: generalUserSelect,
			},
		},
	});

	if (!banner)
		throw new CustomError("Banner does not exist.", StatusCodes.NOT_FOUND);

	res.json({ message: "success", data: banner });
};

export const createBanner = async (req: Req, res: Response) => {
	const { name, url } = req.body;

	const banner = await prisma.banner.create({
		data: {
			name,
			url,
		},
	});

	res.json({ message: "success", data: banner });
};
