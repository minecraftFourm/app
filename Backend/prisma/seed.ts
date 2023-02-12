import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import crypto from "crypto";
import * as argon from "argon2";
import games from "../src/db/defaultConfig/games";
import { ADMIN_ROLE_ID, DEFAULT_PROFILE_PICTURE } from "../src/config";
import roles from "../src/db/defaultConfig/roles";
import categories from "../src/db/defaultConfig/categories";
import mainCategories from "../src/db/defaultConfig/mainCategories";
import users from "../src/db/defaultConfig/users";
import posts from "../src/db/defaultConfig/posts";

const main = async () => {
	const salt = crypto.randomBytes(128);
	const password = await argon.hash("adminuser", { salt });

	const defaultGames = await games();
	const defaultRoles = await roles();
	const defaultMainCategories = await mainCategories();
	const defaultCategories = await categories();
	const defaultUsers = await users();
	const defaultPosts = await posts();

	// const announcementCategory = await prisma.category.upsert({
	// 	where: { id: ANNOUNCEMENT_CATEGORY_ID },
	// 	update: {},
	// 	create: {
	// 		id: ANNOUNCEMENT_CATEGORY_ID,
	// 		name: "Announcement",
	// 		adminOnly: true,
	// 	},
	// });
};

main()
	.then(async () => {
		await prisma.$disconnect();
		console.log("Finished pre-populating database.");
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
