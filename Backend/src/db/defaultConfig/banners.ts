import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { DEFAULT_BANNER_ID } from "../../config";

const banners = async () => {
	const DefaultBanner = await prisma.banner.upsert({
		where: { id: DEFAULT_BANNER_ID },
		update: {},
		create: {
			id: DEFAULT_BANNER_ID,
			name: "Default Banner",
			url: "https://res.cloudinary.com/dm5kc3cci/image/upload/v1680292020/photo-1504704911898-68304a7d2807_o2vor8.avif",
		},
	});
};

export default banners;
