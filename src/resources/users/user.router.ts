import { FastifyPluginCallback } from 'fastify';
import UserControllers from './user.controller';
import UserSchemas from './user.opts.json';

/**
 * Set users routes with request and response schemas
 * 
 * @param app - Instance of app
 * @param opts - Options
 * @param done-  Done callback
 */
const userRoutes: FastifyPluginCallback = (app, opts, done): void => {

  app.get('/users', UserSchemas.getUsers, UserControllers.getUsers);
  app.get('/users/:userId', UserSchemas.getUser, UserControllers.getUser);
  app.put('/users/:userId', UserSchemas.putUser, UserControllers.putUser);
  app.post('/users', UserSchemas.postUser, UserControllers.postUser);
  app.delete('/users/:userId', UserSchemas.deleteUser, UserControllers.deleteUser)

  done();
}

export default userRoutes;
