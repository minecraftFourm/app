import { Router } from "express";
import { /* refresh,*/ registerUser, signInUser, signOutUser } from "../controllers/auth.controller";
import wrapper from "../middlewears/async-wrapper";

export const authRouter = Router()

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
   *     - Authentication
 *     summary: Register a User.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The User's Username.
 *                 example: testuser123
 *               password:
 *                 type: string
 *                 description: The User's Password.
 *                 example: Password1232!
 *               email:
 *                 type: string
 *                 description: The User's Email.
 *                 example: testemail@gmail.com
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                      type: string
 *                      description: The User's Id.
 *                      example: e34a7ca6-4bfc-441a-a8dc-442ea9662e85
 *                  username:
 *                      type: string
 *                      description: The User's Username.
 *                      example: testuser123
 *                  email:
 *                      type: string
 *                      description: The User's Email.
 *                      example: testemail@gmail.com
*/
authRouter.post("/register", wrapper(registerUser))

 /**
 * @swagger
 * /login:
 *   post:
 *     tags:
*     - Authentication
 *     summary: Sign In a User.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                  email:
 *                      type: string
 *                      description: The User's Email.
 *                      example: testemail@gmail.com
 *                  password:
 *                      type: string
 *                      description: The User's Password.
 *                      example: Password1232!
 *     responses:
 *       202:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                      type: string
 *                      description: The User's Id.
 *                      example: e34a7ca6-4bfc-441a-a8dc-442ea9662e85
 *                  username:
 *                      type: string
 *                      description: The User's Username.
 *                      example: testuser123
 *                  email:
 *                      type: string
 *                      description: The User's Email.
 *                      example: testemail@gmail.com
*/
authRouter.post("/login", wrapper(signInUser))

 /**
 * @swagger
 * /logout:
 *   post:
 *     tags:
*     - Authentication
 *     summary: Sign Out a User.
 *     responses:
 *       204:
 *         description: Logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
*/
authRouter.post("/logout", wrapper(signOutUser))
// ! Don't think we need a specific route dedicated to refreshing tokens anymore.
// authRouter.post("/refresh", wrapper(refresh))