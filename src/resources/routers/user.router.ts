import { FastifyPluginCallback } from 'fastify';
import {
  getUsers,
  getUser,
  putUser,
  postUser,
  deleteUser,
} from '../controllers';
import opts from './opts/user.opts.json';
import { userSchemas } from '../schemas';
import { UserEntity } from '../entities';

/**
 * Set users routes with request and response schemas
 * @param app - Instance of app
 * @param _ - Options
 * @param done -  Done callback
 * @returns void
 */
const userRoutes: FastifyPluginCallback = async (
  app,
  _,
  done
): Promise<void> => {
  app.addSchema(userSchemas.user);
  app.addSchema(userSchemas.userGet);
  app.addSchema(userSchemas.userPost);

  app.get('/users', {
    ...opts.getUsers,
    preHandler: [app.auth]
  }, getUsers);
  
  app.get<{
    Params: {
      userId: string;
    };
  }>('/users/:userId', {
    ...opts.getUser,
    preHandler: [app.auth]
  }, getUser);

  app.put<{
    Body: UserEntity;
    Params: {
      userId: string;
    };
  }>('/users/:userId', {
    ...opts.putUser,
    preHandler: [app.auth]
  }, putUser);

  app.post<{
    Body: UserEntity;
  }>('/users', {
    ...opts.postUser,
    preHandler: [app.auth]
  }, postUser);

  app.delete<{
    Params: {
      userId: string;
    };
  }>('/users/:userId', {
    ...opts.deleteUser,
    preHandler: [app.auth]
  }, deleteUser);

  done();
};

export default userRoutes;
