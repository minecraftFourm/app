import { PrismaClient } from "@prisma/client";
import { ADMIN_USER_ID, DEFAULT_USER_ID } from "../../config";
import { announcement1_ID, announcement2_ID } from "./posts";
const prisma = new PrismaClient();

const comments = async () => {
	const comment1 = await prisma.comment.upsert({
		where: { id: "7aeb4354-f13d-4fe7-8722-c79335aa03a1" },
		update: {},
		create: {
			id: "7aeb4354-f13d-4fe7-8722-c79335aa03a1",
			comment: "Here's a test comment",
			postId: announcement1_ID,
			userId: DEFAULT_USER_ID,
		},
	});

	const comment2 = await prisma.comment.upsert({
		where: { id: "7234951a-a14d-48ad-85bf-bb063af8be8e" },
		update: {},
		create: {
			id: "7234951a-a14d-48ad-85bf-bb063af8be8e",
			comment: "Here's another test comment",
			postId: announcement1_ID,
			userId: ADMIN_USER_ID,
		},
	});

	const comment3 = await prisma.comment.upsert({
		where: { id: "8df774f8-e4c8-4bfb-84b4-ebacdb15be28" },
		update: {},
		create: {
			id: "8df774f8-e4c8-4bfb-84b4-ebacdb15be28",
			comment: "Here's another test comment",
			postId: announcement2_ID,
			userId: ADMIN_USER_ID,
		},
	});

	return 0;
};

export default comments;
