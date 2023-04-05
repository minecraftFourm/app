import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import controllers from "../src/db/defaultConfig";

const main = async () => {
	const {
		categories,
		roles,
		users,
		comments,
		games,
		posts,
		mainCategories,
		settings,
		banner,
	} = controllers;

	const defaultBanner = await banner();
	const defaultGames = await games();
	const defaultRoles = await roles();
	const defaultMainCategories = await mainCategories();
	const defaultCategories = await categories();
	const defaultUsers = await users();
	const defaultPosts = await posts();
	const defaultComments = await comments();
	const defaultSettings = await settings();
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
