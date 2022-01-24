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
import { PartialRequired } from '../../types';

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

  app.get(
    '/users',
    {
      ...opts.getUsers,
      preValidation: [app.auth],
    },
    getUsers
  );

  app.get<{
    Params: {
      userId: string;
    };
  }>(
    '/users/:userId',
    {
      ...opts.getUser,
      preValidation: [app.auth],
    },
    getUser
  );

  app.put<{
    Body: PartialRequired<UserEntity, 'password' | 'name' | 'login'>;
    Params: {
      userId: string;
    };
  }>(
    '/users/:userId',
    {
      ...opts.putUser,
      preValidation: [app.auth],
    },
    putUser
  );

  app.post<{
    Body: PartialRequired<UserEntity, 'password' | 'name' | 'login'>;
  }>(
    '/users',
    {
      ...opts.postUser,
      preValidation: [app.auth],
    },
    postUser
  );

  app.delete<{
    Params: {
      userId: string;
    };
  }>(
    '/users/:userId',
    {
      ...opts.deleteUser,
      preValidation: [app.auth],
    },
    deleteUser
  );

  done();
};

export default userRoutes;
