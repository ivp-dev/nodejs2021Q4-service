import { FastifyReply, FastifyRequest } from 'fastify';
import { BoardModel } from '../../types';
import boardsService from './board.service';

/**
 * Get boards route controller
 * @param req - Fastify request
 * @param res - Fastify reply
 * @returns Promise void
 */
async function getBoards(
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> {
  const boards = await boardsService.getAll();

  res.code(200).send(boards);
}

/**
 * Get board route controller
 * @param req - Fastify request
 * @param res - Fastify reply
 * @returns Promise void
 */
async function getBoard(
  req: FastifyRequest<{ Params: { boardId: string } }>,
  res: FastifyReply
): Promise<void> {
  const { boardId } = req.params;
  const board = await boardsService.getById(boardId);

  if (!board) {
    res.code(404).send('Not Found');
    return;
  }

  res.code(200).send(board);
}

/**
 * Store board route controller
 * @param req - Fastify request
 * @param res - Fastify reply
 * @returns Promise void
 */
async function postBoard(
  req: FastifyRequest<{ Body: BoardModel }>,
  res: FastifyReply
): Promise<void> {
  const { body: board } = req;
  const newboard = await boardsService.addBoard(board);
  res.code(201).send(newboard);
}

/**
 * Update board route controller
 * @param req - Fastify request
 * @param res - Fastify reply
 * @returns Promise void
 */
async function putBoard(
  req: FastifyRequest<{ Params: { boardId: string }; Body: BoardModel }>,
  res: FastifyReply
): Promise<void> {
  const { body: board } = req;
  const { boardId } = req.params;
  console.log('########################')
  const updatedboard = await boardsService.updateBoard(boardId, board);

  if (!updatedboard) {
    res.code(404).send('Not Found');
    return;
  }

  res.code(200).send(updatedboard);
}

/**
 * Delete stored board route controller
 * @param req - Fastify request
 * @param res - Fastify reply
 * @returns Promise void
 */
async function deleteBoard(
  req: FastifyRequest<{ Params: { boardId: string } }>,
  res: FastifyReply
): Promise<void> {
  const { boardId } = req.params;

  await boardsService.deleteBoard(boardId);
  res.code(204);
}

export default {
  getBoard,
  getBoards,
  postBoard,
  putBoard,
  deleteBoard,
};
