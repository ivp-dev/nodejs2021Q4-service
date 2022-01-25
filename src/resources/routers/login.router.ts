import { FastifyPluginCallback } from 'fastify';
import { postLogin } from '../controllers';
import { loginSchema } from '../schemas';
import opts from './opts/login.opts.json';

const loginRoutes: FastifyPluginCallback = (app, _, done): void => {
  app.addSchema(loginSchema.loginPost);
  app.addSchema(loginSchema.loginGet);

  app.post('/login', opts.postCredentials, postLogin);

  done();
};

export default loginRoutes;
