import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const defaultSettings = async () => {
	const setting = await prisma.setting.upsert({
		where: { id: "f4a52bb2-29a7-4e6a-9326-f7c2db81127a" },
		update: {},
		create: {
			id: "f4a52bb2-29a7-4e6a-9326-f7c2db81127a",
			infobar: "Change this in dashboard",
			maintenance: false,
			serverName: "My Server",
		},
	});
};

export default defaultSettings;
