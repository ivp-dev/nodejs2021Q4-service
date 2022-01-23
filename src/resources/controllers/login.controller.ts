/* eslint-disable import/prefer-default-export */
import { FastifyRequest, FastifyReply } from 'fastify';
import { UserEntity } from '../entities';
import { LoginModel } from '../../types';
import { loginService, userService } from '../services';

const userValidation = (
  user: UserEntity | undefined
): user is Required<UserEntity> => !!user && !!user.id && !!user.login;

/**
 * Login controller
 * @param req - Fastify request
 * @param res - Festify reply
 * @returns Promise void
 */
export async function postLogin(
  req: FastifyRequest<{ Body: LoginModel }>,
  res: FastifyReply
): Promise<void> {
  const { login, password } = req.body;
  const user = await userService.getByName(login);

  if (userValidation(user) && req.bcryptCompare(password, user.password)) {
    const token = await loginService.getTokenData({
      login: user.login,
      userId: user.id,
    });
    res.code(201).send(token);
  } else {
    res
      .code(403)
      .send({ was: 'There is no such user or the password is unvalid' });
  }
}
