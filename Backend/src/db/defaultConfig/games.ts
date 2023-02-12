import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const games = async () => {
	const game1 = await prisma.game.upsert({
		where: {
			id: "2f2cd7cc-a8f6-4075-8f37-83f2bc7f6ca7",
		},
		update: {},
		create: {
			title: "Game 1",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel commodo ligula. Nulla libero tortor, cursus non pharetra eu, aliquet quis massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer porttitor, dui blandit vestibulum rhoncus, massa elit mattis dui, non molestie est mauris quis quam.",
			previewImg:
				"https://images.pexels.com/photos/461940/pexels-photo-461940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
			tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
		},
	});

	const game2 = await prisma.game.upsert({
		where: {
			id: "d1bd1240-7b90-4a83-9ac4-8637fab878b4",
		},
		update: {},
		create: {
			title: "Game 2",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel commodo ligula. Nulla libero tortor, cursus non pharetra eu, aliquet quis massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer porttitor, dui blandit vestibulum rhoncus, massa elit mattis dui, non molestie est mauris quis quam.",
			previewImg:
				"https://images.pexels.com/photos/461940/pexels-photo-461940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
			tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
		},
	});

	const game3 = await prisma.game.upsert({
		where: {
			id: "8f9fdb28-b200-4bf6-b9ec-a5dc1c83fd0e",
		},
		update: {},
		create: {
			title: "Game 3",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel commodo ligula. Nulla libero tortor, cursus non pharetra eu, aliquet quis massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer porttitor, dui blandit vestibulum rhoncus, massa elit mattis dui, non molestie est mauris quis quam.",
			previewImg:
				"https://images.pexels.com/photos/461940/pexels-photo-461940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
			tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
		},
	});

	const game4 = await prisma.game.upsert({
		where: {
			id: "cec78f9f-5186-4870-8d30-abc0a6f1e7bf",
		},
		update: {},
		create: {
			title: "Game 4",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel commodo ligula. Nulla libero tortor, cursus non pharetra eu, aliquet quis massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer porttitor, dui blandit vestibulum rhoncus, massa elit mattis dui, non molestie est mauris quis quam.",
			previewImg:
				"https://images.pexels.com/photos/461940/pexels-photo-461940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
			tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
		},
	});

	return 0;
};

export default games;
