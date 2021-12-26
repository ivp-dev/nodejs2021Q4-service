import fastify from 'fastify';
import swagger from 'fastify-swagger';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

import enableLogging from './enable-logging';
import registerSchemas from './register-schemas';

const app = fastify({
  disableRequestLogging: true,
});

// Set swagger docs
app.register(swagger, {
  routePrefix: '/doc',
  specification: {
    baseDir: './doc',
    path: '/api.yaml',
  },
  exposeRoute: true,
});

enableLogging(app);

registerSchemas(app);

// Setup controllers
app.register(userRouter);
app.register(taskRouter);
app.register(boardRouter);

export default app;
