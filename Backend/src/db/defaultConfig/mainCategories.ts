import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import {
	COMMUNITY_CATEGORY_ID,
	CONTACT_CATEGORY_ID,
	UPDATES_CATEGORY_ID,
} from "../../config";

const mainCategories = async () => {
	const updatesCategory = await prisma.mainCategory.upsert({
		where: { id: UPDATES_CATEGORY_ID },
		update: {},
		create: {
			id: UPDATES_CATEGORY_ID,
			title: "Official Updates",
			description:
				"Official news, announcements, and information posted by `ServerName` Administrators regarding the network.",
			priority: 1,
		},
	});

	const communityCategory = await prisma.mainCategory.upsert({
		where: { id: COMMUNITY_CATEGORY_ID },
		update: {},
		create: {
			id: COMMUNITY_CATEGORY_ID,
			title: "`ServerName` Community",
			description:
				"Check out all the other forum sections dedicated to community creations, events, and non-`serverName` related discussions!",
			priority: 2,
		},
	});

	const contactCategory = await prisma.mainCategory.upsert({
		where: { id: CONTACT_CATEGORY_ID },
		update: {},
		create: {
			id: CONTACT_CATEGORY_ID,
			title: "Contact the Staff",
			description:
				"In this section you can learn about how to report rule breakers, submit punishment appeals, or open bug reports.",
			priority: 3,
		},
	});

	return 0;
};

export default mainCategories;
