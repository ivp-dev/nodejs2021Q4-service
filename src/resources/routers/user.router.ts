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

  app.get('/users', opts.getUsers, getUsers);
  app.get('/users/:userId', opts.getUser, getUser);
  app.put('/users/:userId', opts.putUser, putUser);
  app.post('/users', opts.postUser, postUser);
  app.delete('/users/:userId', opts.deleteUser, deleteUser);

  done();
};

export default userRoutes;
