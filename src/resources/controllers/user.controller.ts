import { FastifyReply, FastifyRequest } from 'fastify';
import UserEntity from '../entities/user.entity';
import { userService } from '../services';
import { PartialRequired } from '../../types';

/**
 * Get all users route controller
 * @param req - Fastify request
 * @param res - Fastify reply
 * @returns Promise void
 */
export async function getUsers(
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> {
  const users = await userService.getAll();
  // map user fields to exclude secret fields like "password"
  res.code(200).send(users);
}

/**
 * Get user route controller
 * @param req - Fastify request
 * @param res - Fastify reply
 * @returns Promise void
 */
export async function getUser(
  req: FastifyRequest<{ Params: { userId: string } }>,
  res: FastifyReply
): Promise<void> {
  const { userId } = req.params;
  const user = await userService.getById(userId);

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
export async function postUser(
  req: FastifyRequest<{
    Body: PartialRequired<UserEntity, 'password' | 'name' | 'login'>;
  }>,
  res: FastifyReply
): Promise<void> {
  const { body: user } = req;

  const newUser = await userService.createUser(
    user,
    await req.bcryptHash(user.password)
  );
  res.code(201).send(newUser);
}

/**
 * Update stored user route controller
 * @param req - Fastify request
 * @param res - Fastify reply
 * @returns Promise void
 */
export async function putUser(
  req: FastifyRequest<{
    Body: PartialRequired<UserEntity, 'password' | 'name' | 'login'>;
    Params: { userId: string };
  }>,
  res: FastifyReply
): Promise<void> {
  const { body: user } = req;
  const { userId } = req.params;
  const updatedUser = await userService.updateUser(
    userId,
    user,
    await req.bcryptHash(user.password)
  );

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
export async function deleteUser(
  req: FastifyRequest<{ Params: { userId: string } }>,
  res: FastifyReply
): Promise<void> {
  const { userId } = req.params;

  await userService.deleteUser(userId);

  res.code(204);
}
