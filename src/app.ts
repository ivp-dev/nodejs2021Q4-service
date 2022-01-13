import fastify from 'fastify';
import swagger from 'fastify-swagger';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import typeormConfig from './common/config.typeorm';

import enableLogging from './enable-logging';
import registerSchemas from './register-schemas';
import { createConnection } from 'typeorm';

const app = fastify();

// Set swagger docs
app.register(swagger, {
  routePrefix: '/doc',
  specification: {
    baseDir: './doc',
    path: '/api.yaml',
  },
  exposeRoute: true,
});

// setup logger
enableLogging(app);

// register data schemas 
// to requests end response
registerSchemas(app);

// setup connection to db 
createConnection();

// Setup controllers
app.register(userRouter);
app.register(taskRouter);
app.register(boardRouter);

export default app;
