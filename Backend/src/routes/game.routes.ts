import { Router } from 'express';
import { createGame, deleteGame, editGame, getGame, getGames } from '../controllers/game.controller';
import wrapper from '../middlewears/async-wrapper';
import auth from '../middlewears/auth';

export const gamesRouter = Router();

/**
 * @swagger
 * /game:
 *   get:
 *     tags:
 *       - Games
 *     summary: Get all Games.
 *     
 *    
*/
gamesRouter.get('/', wrapper(getGames))

/**
 * @swagger
 * /game/:id:
 *   get:
 *     tags:
 *       - Games
 *     summary: Get a Game By Id.
 *     
 *    
*/
gamesRouter.get('/:id', wrapper(getGame))

/**
 * @swagger
 * /game/:id:
 *   post:
 *     tags:
 *       - Games
 *     summary: Create a Game.
 *     
 *    
*/
gamesRouter.post('/', auth, wrapper(createGame))

/**
 * @swagger
 * /game/:id:
 *   patch:
 *     tags:
 *       - Games
 *     summary: Update a Game.
 *     
 *    
*/
gamesRouter.patch('/:id', auth, wrapper(editGame))

/**
 * @swagger
 * /game/:id:
 *   delete:
 *     tags:
 *       - Games
 *     summary: Delete a Game By Id.
 *     
 *    
*/
gamesRouter.delete('/:id', auth, wrapper(deleteGame))

