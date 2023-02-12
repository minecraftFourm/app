import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import {
	ANNOUNCEMENT_CATEGORY_ID,
	UPDATES_CATEGORY_ID,
	COMMUNITY_CATEGORY_ID,
	CONTACT_CATEGORY_ID,
} from "../../config";

const categories = async () => {
	const announcementCategory = await prisma.category.upsert({
		where: { id: ANNOUNCEMENT_CATEGORY_ID },
		update: {},
		create: {
			id: ANNOUNCEMENT_CATEGORY_ID,
			name: "News & Announcement",
			adminOnly: true,
			mainCategoryId: UPDATES_CATEGORY_ID,
		},
	});

	const changesCategory = await prisma.category.upsert({
		where: { id: "8afa2d4f-187c-4d9f-92e7-065c29af4c9a" },
		update: {},
		create: {
			id: "8afa2d4f-187c-4d9f-92e7-065c29af4c9a",
			name: "Moderation Information and Changes",
			adminOnly: true,
			mainCategoryId: UPDATES_CATEGORY_ID,
		},
	});

	const introductionCategory = await prisma.category.upsert({
		where: { id: "0831c282-ae95-412e-95f4-c81c14b21489" },
		update: {},
		create: {
			id: "0831c282-ae95-412e-95f4-c81c14b21489",
			name: "Introduce yourself",
			adminOnly: false,
			mainCategoryId: COMMUNITY_CATEGORY_ID,
		},
	});

	const eventsCategory = await prisma.category.upsert({
		where: { id: "2a75ac0c-08a0-4488-b1f6-b3478a3497e9" },
		update: {},
		create: {
			id: "2a75ac0c-08a0-4488-b1f6-b3478a3497e9",
			name: "`ServerName` Events",
			adminOnly: false,
			mainCategoryId: COMMUNITY_CATEGORY_ID,
		},
	});

	const ideasCategory = await prisma.category.upsert({
		where: { id: "cb1749b3-c3d3-473b-a085-b7e0c071cf54" },
		update: {},
		create: {
			id: "cb1749b3-c3d3-473b-a085-b7e0c071cf54",
			name: "Ideas & Feedback",
			adminOnly: false,
			mainCategoryId: COMMUNITY_CATEGORY_ID,
		},
	});

	const communityHelpCategory = await prisma.category.upsert({
		where: { id: "08e7a6c4-e0b2-43bf-87d9-6ce72b418be4" },
		update: {},
		create: {
			id: "08e7a6c4-e0b2-43bf-87d9-6ce72b418be4",
			name: "Community Help Forum",
			adminOnly: false,
			mainCategoryId: COMMUNITY_CATEGORY_ID,
		},
	});

	const reportCategory = await prisma.category.upsert({
		where: { id: "3a77d75c-6661-4884-b913-70d5d569c10a" },
		update: {},
		create: {
			id: "3a77d75c-6661-4884-b913-70d5d569c10a",
			name: "Report Rule Breakers",
			adminOnly: false,
			mainCategoryId: CONTACT_CATEGORY_ID,
		},
	});

	const punishmentCategory = await prisma.category.upsert({
		where: { id: "2f3db0ac-7e6a-4ed0-816f-a372cdff945b" },
		update: {},
		create: {
			id: "2f3db0ac-7e6a-4ed0-816f-a372cdff945b",
			name: "Punishment Appeals",
			adminOnly: false,
			mainCategoryId: CONTACT_CATEGORY_ID,
		},
	});

	return 0;
};

export default categories;
