import { FastifyReply, FastifyRequest } from 'fastify';
import { UserModel } from '../../types';
import usersService from './user.service';

/**
 * Get all users route controller
 * @param req - Fastify request
 * @param res - Fastify reply
 * @returns Promise void
 */
async function getUsers(req: FastifyRequest, res: FastifyReply): Promise<void> {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.code(200).send(users);
}

/**
 * Get user route controller
 * @param req - Fastify request
 * @param res - Fastify reply
 * @returns Promise void
 */
async function getUser(
  req: FastifyRequest<{ Params: { userId: string } }>,
  res: FastifyReply
): Promise<void> {
  const { userId } = req.params;
  const user = await usersService.getById(userId);

  if (!user) {
    res.callNotFound();
    return;
  }

  res.code(200).send(user);
}

/**
 * Store user route controller
 * @param req - Fastify request
 * @param res - Fastify reply
 * @returns Promise void
 */
async function postUser(
  req: FastifyRequest<{ Body: UserModel }>,
  res: FastifyReply
): Promise<void> {
  const { body: user } = req;
  const newUser = await usersService.createUser(user);
  res.code(201).send(newUser);
}

/**
 * Update stored user route controller
 * @param req - Fastify request
 * @param res - Fastify reply
 * @returns Promise void
 */
async function putUser(
  req: FastifyRequest<{ Body: UserModel; Params: { userId: string } }>,
  res: FastifyReply
): Promise<void> {
  const { body: user } = req;
  const { userId } = req.params;
  const updatedUser = await usersService.updateUser(userId, user);

  if (!updatedUser) {
    res.callNotFound();
    return;
  }

  res.code(200).send(updatedUser);
}

/**
 * Delete stored user route controller
 * @param req - Fastify request
 * @param res - Fastify reply
 * @returns Promise void
 */
async function deleteUser(
  req: FastifyRequest<{ Params: { userId: string } }>,
  res: FastifyReply
): Promise<void> {
  const { userId } = req.params;

  await usersService.deleteUser(userId);

  res.code(204);
}

export default {
  getUser,
  getUsers,
  postUser,
  putUser,
  deleteUser,
};
