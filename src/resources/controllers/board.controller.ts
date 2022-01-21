import { FastifyReply, FastifyRequest } from 'fastify';
import BoardEntity from '../entities/board.entity';
import { boardService } from '../services';

/**
 * Get boards route controller
 * @param req - Fastify request
 * @param res - Fastify reply
 * @returns Promise void
 */
export async function getBoards(
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> {
  const boards = await boardService.getAll();

  res.code(200).send(boards);
}

/**
 * Get board route controller
 * @param req - Fastify request
 * @param res - Fastify reply
 * @returns Promise void
 */
export async function getBoard(
  req: FastifyRequest<{ Params: { boardId: string } }>,
  res: FastifyReply
): Promise<void> {
  const { boardId } = req.params;
  const board = await boardService.getById(boardId);

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
export async function postBoard(
  req: FastifyRequest<{ Body: BoardEntity }>,
  res: FastifyReply
): Promise<void> {
  const { body: board } = req;
  const newboard = await boardService.addBoard(board);
  res.code(201).send(newboard);
}

/**
 * Update board route controller
 * @param req - Fastify request
 * @param res - Fastify reply
 * @returns Promise void
 */
export async function putBoard(
  req: FastifyRequest<{ Params: { boardId: string }; Body: BoardEntity }>,
  res: FastifyReply
): Promise<void> {
  const { body: board } = req;
  const { boardId } = req.params;
  const updatedboard = await boardService.updateBoard(boardId, board);

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
export async function deleteBoard(
  req: FastifyRequest<{ Params: { boardId: string } }>,
  res: FastifyReply
): Promise<void> {
  const { boardId } = req.params;

  await boardService.deleteBoard(boardId);
  res.code(204);
}
