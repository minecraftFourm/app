import prisma from "../db/prisma.client";
import crypto from "crypto";
import * as argon from "argon2";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import {
	ACCESS_TOKEN_EXIPIRY,
	DEFAULT_BANNER_ID,
	DEFAULT_PROFILE_PICTURE,
	DEFAULT_ROLE_ID,
	EMAIL_PATTERN,
	PASSWORD_PATTERN,
	REFRESH_TOKEN_EXIPIRY,
	USERNAME_PATTERN,
} from "../config";
import CustomError from "../middlewears/custom-error";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

type UserBody = {
	username: string;
	password: string;
	email: string;
};

type LoginBody = {
	email: string;
	password: string;
};

type props = {
	id: string;
	username: string;
	email: string;
	role?: {};
	profilePicture: string;
};

export const jwt_generator = async (payload: props, res: Response) => {
	const jwt_key = process.env.JWT_SECRET_KEY as string;

	const accessToken = jwt.sign(payload, jwt_key, {
		expiresIn: `${ACCESS_TOKEN_EXIPIRY}m`,
	});
	const refreshToken = jwt.sign(payload, jwt_key, {
		expiresIn: `${REFRESH_TOKEN_EXIPIRY}m`,
	});

	await prisma.user.update({
		where: {
			id: payload.id,
		},
		data: {
			refreshToken: refreshToken,
		},
	}); // Updates the user db with the latest refresh token.

	// res.cookie('rt', refreshToken, {
	// maxAge: 1000 * 60 * 60 * 24 * 7,
	// * maxAge isn't supported by all browsers
	//     httpOnly: true
	// })

	res.cookie("RefreshToken", refreshToken, {
		signed: true,
		httpOnly: true,
		maxAge: REFRESH_TOKEN_EXIPIRY,
	});

	res.cookie("Authorization", `Bearer ${accessToken}`, {
		maxAge: ACCESS_TOKEN_EXIPIRY,
		httpOnly: false,
		signed: true,
	});

	return;
};

export const loginUser = async (auth: LoginBody, res: Response) => {
	const { email, password } = auth;

	// Validations
	if (!password || !email)
		throw new CustomError(
			"Please input a valid email, and password.",
			StatusCodes.BAD_REQUEST
		);
	if (!EMAIL_PATTERN.test(email))
		throw new CustomError(
			"Please input a valid email",
			StatusCodes.BAD_REQUEST
		);

	const user = await prisma.user.findUnique({
		where: {
			email: email.toLowerCase(),
		},
		include: {
			role: true,
		},
	});

	if (!user) {
		throw new CustomError("Email not found", StatusCodes.BAD_REQUEST);
	}

	if (!(await argon.verify(user.password, password))) {
		throw new CustomError("Invalid Password", StatusCodes.BAD_REQUEST);
	}

	const returnValue = {
		id: user.id,
		username: user.username,
		role: user.role,
		email: user.email,
		profilePicture: user.profilePicture,
	};

	await jwt_generator({ ...returnValue }, res);

	return { ...returnValue };
};

export const createUser = async (user: UserBody, res: Response) => {
	let { username, password, email } = user;

	if (!username) username = "";
	const validateUsername = USERNAME_PATTERN.test(username);
	const validateEmail = EMAIL_PATTERN.test(email);
	const validatePassword = PASSWORD_PATTERN.test(password);

	// * Checks if a real email, good password and solid username has been provided using Regex patterns I copied from the world wide web.
	if (!validateUsername)
		throw new CustomError("Invalid Username.", StatusCodes.BAD_REQUEST);
	if (!validatePassword)
		throw new CustomError("Invalid Password.", StatusCodes.BAD_REQUEST);
	if (!validateEmail)
		throw new CustomError("Invalid Email.", StatusCodes.BAD_REQUEST);

	// * Makes it case insensitive
	username = username.toLowerCase();
	email = email.toLowerCase();

	const salt = crypto.randomBytes(128);
	password = await argon.hash(password, { salt });

	try {
		const newUser = await prisma.user.create({
			data: {
				username,
				password,
				email,
				bannerId: DEFAULT_BANNER_ID,
				roleId: DEFAULT_ROLE_ID,
				profilePicture: DEFAULT_PROFILE_PICTURE,
			},
			select: {
				id: true,
				username: true,
				role: true,
				email: true,
				profilePicture: true,
			},
		});

		await jwt_generator(newUser, res);

		return newUser;
	} catch (error: any) {
		if (error.code === "P2003")
			throw new CustomError(
				ReasonPhrases.INTERNAL_SERVER_ERROR,
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		throw new CustomError(error.message, error.code);
	}
};

export const logoutUser = (res: Response) => {
	res.cookie("RefreshToken", "", {
		expires: new Date(0),
		httpOnly: true,
	});

	res.cookie("Authorization", "", {
		expires: new Date(0),
		httpOnly: false,
		signed: true,
	});
};

// ! Don't think we need a specific route dedicated to refreshing tokens anymore.
// export const refreshToken = async (req: Request, res: Response) => {
//     try {
//         const oldToken = req.cookies['rt'];
//         const jwt_key =  process.env.JWT_SECRET_KEY as string

//         const decoded = jwt.verify(oldToken, jwt_key) as { _id: string}

//         if(!decoded){
//             throw new CustomError("Invalid Token", StatusCodes.UNAUTHORIZED)
//         }

//         const user = await prisma.user.findUnique({
//             where: {
//                 id: decoded._id
//             }
//         })

//         if(!user){
//             throw new CustomError("User not found", StatusCodes.UNAUTHORIZED)
//         }

//         await jwt_generator({ id: user.id, username: user.username }, res)

//         return { ...user }
//     } catch(e: any){
//         return {
//             message: e.message
//         }
//     }
// }
