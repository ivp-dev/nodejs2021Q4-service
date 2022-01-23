import { FastifyInstance, RegisterOptions } from 'fastify';

import { userRouter, boardRouter, taskRouter, loginRouter } from './resources/routers';

const app = (
  fastify: FastifyInstance,
  opts: RegisterOptions,
  done: (err: Error | undefined) => void
): void => {
  boardRouter(fastify, opts, done);
  userRouter(fastify, opts, done);
  taskRouter(fastify, opts, done);
  loginRouter(fastify, opts, done);
};

export default app;
