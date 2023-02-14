import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import crypto from "crypto";
import * as argon from "argon2";
import {
	ADMIN_ROLE_ID,
	ADMIN_USER_ID,
	DEFAULT_ADMIN_PASSWORD,
	DEFAULT_PROFILE_PICTURE,
	DEFAULT_ROLE_ID,
	DEFAULT_USER_ID,
	DEFAULT_USER_PASSWORD,
} from "../../config";

const users = async () => {
	const salt = crypto.randomBytes(128);
	const admin_password = await argon.hash(DEFAULT_ADMIN_PASSWORD, { salt });
	const user_password = await argon.hash(DEFAULT_USER_PASSWORD, { salt });

	const adminUser = await prisma.user.upsert({
		where: {
			id: ADMIN_USER_ID,
		},
		update: {},
		create: {
			id: ADMIN_USER_ID,
			email: "admin@example.com",
			password: admin_password,
			username: "admin",
			roleId: ADMIN_ROLE_ID,
			profilePicture: DEFAULT_PROFILE_PICTURE,
			bio: "Default Admin user",
		},
	});

	const normalUser = await prisma.user.upsert({
		where: {
			id: DEFAULT_USER_ID,
		},
		update: {},
		create: {
			id: DEFAULT_USER_ID,
			email: "user@example.com",
			password: user_password,
			username: "user",
			roleId: DEFAULT_ROLE_ID,
			profilePicture: DEFAULT_PROFILE_PICTURE,
			bio: "Default Admin user",
		},
	});
};

export default users;
