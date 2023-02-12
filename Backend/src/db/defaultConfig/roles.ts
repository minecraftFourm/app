import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { ADMIN_ROLE_ID, DEFAULT_ROLE_ID } from "../../config";

const roles = async () => {
	const defaultRole = await prisma.role.upsert({
		where: {
			id: DEFAULT_ROLE_ID,
		},
		update: {},
		create: {
			id: DEFAULT_ROLE_ID,
			title: "Member",
			color: "#363636",
			canCreatePost: true,
			canCreateComment: true,
			canDeleteComment: true,
			canDeletePost: true,
			canEditPost: true,
			canEditComment: true,
		},
	});

	const adminRole = await prisma.role.upsert({
		where: {
			id: ADMIN_ROLE_ID,
		},
		update: {},
		create: {
			id: ADMIN_ROLE_ID,
			title: "Administrator",
			color: "#FF0000",
			canCreatePost: true,
			canCreateComment: true,
			canDeleteComment: true,
			canDeletePost: true,
			canEditPost: true,
			canEditComment: true,
			isAdmin: true,
			isStaff: true,
			canEditAdmin: true,
			canCreateCategory: true,
			canCreateRole: true,
			canDeleteCategory: true,
			canDeleteOtherComment: true,
			canDeleteOtherPost: true,
			canDeleteRole: true,
			canEditCategory: true,
			canEditOtherComment: true,
			canEditOtherPost: true,
			canEditRole: true,
			canEditUsers: true,
			canManageUsers: true,
			canPostAdmin: true,
			canRemoveUsers: true,
		},
	});

	return 0;
};

export default roles;
