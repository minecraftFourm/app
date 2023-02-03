import { StatusCodes } from "http-status-codes";
import { PASSWORD_PATTERN } from "../config";
import prisma from "../db/prisma.client";
import CustomError from "../middlewears/custom-error";
import { Req } from "./post.service";
import crypto from "crypto";
import * as argon from "argon2";
const cloudinary = require("cloudinary").v2;

export const generalUserSelect = {
	id: true,
	username: true,
	email: true,
	profilePicture: true,
	bio: true,
	created: true,
	followers: true,
	following: true,
	post: true,
	role: true,
};

type pictureStats = {
	url?: string;
	public_id?: string;
};

type perms = {
	isStaff: undefined | boolean;
	isAdmin: undefined | boolean;
};

export const handleDeleteUser = async (req: Req) => {
	const {
		params: { id },
		user: {
			id: currentUser,
			role: { canRemoveUsers, isAdmin },
		},
	} = req;

	// * If user is not an admin, or user does not have permission to delete other users, an error is thrown.
	if (!(isAdmin || canRemoveUsers) || !(id === currentUser))
		throw new CustomError(
			"You do not have permission to delete this users.",
			StatusCodes.UNAUTHORIZED
		);

	// ! An option in the config where users can delete themselves or not

	const user = await prisma.user.findUnique({
		where: { id },
		select: {
			role: {
				select: {
					isStaff: true,
				},
			},
		},
	});

	//! To delete a staff member, you need to be an admin.
	// * If the user being deleted is a staff member, and the user trying to delete this staff member is not an admin, an error is thrown.
	if (user?.role.isStaff && !isAdmin)
		throw new CustomError(
			"You do not have permission to delete this user.",
			StatusCodes.UNAUTHORIZED
		);

	const deletedUser = await prisma.user.delete({
		where: { id },
	});

	return;
};

export const handleGetAllUsers = async (req: Req) => {
	const {
		username,
		email,
		isStaff,
		isAdmin,
		roleId,
		jump = 0,
		sort = "desc",
		limit,
	} = req.query;

	let permissionValues: perms = {
		isStaff: undefined,
		isAdmin: undefined,
	};

	if (isStaff) {
		permissionValues.isStaff = isStaff === "t" ? true : false;
	}

	if (isAdmin) {
		permissionValues.isAdmin = isAdmin === "t" ? true : false;
	}

	console.log(limit);
	const users = await prisma.user.findMany({
		where: {
			username: {
				contains: username || undefined,
				mode: "insensitive",
			},
			email: {
				contains: email || undefined,
				mode: "insensitive",
			},
			role: {
				isStaff: permissionValues.isStaff,
				isAdmin: permissionValues.isAdmin,
			},
			roleId: {
				equals: roleId || undefined,
			},
		},
		skip: Number(jump),
		orderBy: {
			created: sort,
		},
		take: limit ? Number(limit) : undefined,
		select: {
			id: true,
			username: true,
			email: true,
			profilePicture: true,
			bio: true,
			created: true,
			followers: {
				select: {
					user: {
						select: generalUserSelect,
					},
				},
			},
			following: {
				select: {
					user: {
						select: generalUserSelect,
					},
				},
			},
			post: {
				select: {
					id: true,
					title: true,
					content: true,
					comments: true,
					updated: true,
					reactions: true,
					category: true,
				},
			},
			role: {
				select: {
					id: true,
					title: true,
					color: true,
					isStaff: true,
				},
			},
		},
	});

	return users;
};

export const handleEditUser = async (req: Req) => {
	const {
		params: { id },
		body: {
			role: roleId,
			bio,
			email,
			profilePicture,
			username,
			password: currentUserPassword,
			newPassword,
		},
		user: {
			profilePictureId,
			id: userId,
			role: { canEditUsers, isAdmin },
		},
	} = req;
	let updatePassword = { status: false, newPassword: "" };

	// * Checks if the user can edit user, or if the user is an admin.
	// * Or if the current user is the owner of the account being edited.
	if (!(userId === id || canEditUsers || isAdmin))
		throw new CustomError(
			"You do not have permission to edit this user.",
			StatusCodes.UNAUTHORIZED
		);

	// TODO: delete the previous user's profile picture if possible.
	let profilePictureInfo: pictureStats = {};
	if (profilePicture) {
		const options = {
			use_filename: true,
			unique_filename: true,
			overwrite: false,
			folder: "/profile-pictures",
		};

		try {
			// * Upload the image, and get the url
			const result = await cloudinary.uploader.upload(
				profilePicture,
				options
			);

			// * Delete previous profile picture
			if (profilePictureId) {
				await cloudinary.api.delete_resources([profilePictureId]);
			}

			profilePictureInfo = {
				url: result.secure_url,
				public_id: result.public_id,
			};
		} catch (error) {
			console.error(error);
			throw new CustomError(
				"Error uploading profile picture",
				StatusCodes.BAD_REQUEST
			);
		}
	}

	if (currentUserPassword && newPassword) {
		// * Checks if the new password is a valid password.
		if (!PASSWORD_PATTERN.test(newPassword))
			throw new CustomError(
				"Invalid new password.",
				StatusCodes.BAD_REQUEST
			);

		// * Compares the user's given password with the current user's password
		const userData = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				password: true,
			},
		});
		if (!userData?.password)
			throw new CustomError(
				"Error trying to change your password.",
				StatusCodes.INTERNAL_SERVER_ERROR
			);

		const comparePassword = await argon.verify(
			userData.password,
			currentUserPassword
		);
		if (!comparePassword)
			throw new CustomError(
				"Password does not match.",
				StatusCodes.BAD_REQUEST
			);

		const salt = crypto.randomBytes(128);
		updatePassword = {
			status: true,
			newPassword: await argon.hash(newPassword, { salt }),
		};
	}

	const user = await prisma.user.update({
		where: {
			id,
		},
		data: {
			bio,
			email,
			username,
			profilePicture: profilePictureInfo.url,
			profilePictureId: profilePictureInfo?.public_id,
			roleId,
			...(updatePassword.status && {
				password: updatePassword.newPassword,
			}),
		},
		select: generalUserSelect,
	});

	return user;
};

export const handleGetUser = async (id: string) => {
	const user = await prisma.user.findUnique({
		where: { id },
		select: generalUserSelect,
	});

	if (!user) throw new CustomError("User not found", StatusCodes.NOT_FOUND);
	return user;
};
