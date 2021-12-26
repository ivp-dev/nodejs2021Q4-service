import fastify from 'fastify';
import swagger from 'fastify-swagger';
import config from './common/config';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

import userSchemas from './resources/users/schemas';
import boardSchemas from './resources/boards/schemas';
import columnSchemas from './resources/columns/schemas';
import taskSchemas from './resources/tasks/schemas';
import logger from '../plugins/logger';
import enableLogging from './enable-logging';

const app = fastify({
  disableRequestLogging: true,
  logger: true
});

app.register(logger, {
  level: parseFloat(config.LOGGIN_LEVEL)
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

// Add user schemas
app.addSchema(userSchemas.user);
app.addSchema(userSchemas.userGet);
app.addSchema(userSchemas.userPost);

// Add task schemas
app.addSchema(taskSchemas.task);
app.addSchema(taskSchemas.taskPost);

// Add board schemas
app.addSchema(boardSchemas.board);
app.addSchema(boardSchemas.boardPost);

// Add column schemas
app.addSchema(columnSchemas.columnSchema);
app.addSchema(columnSchemas.columnPostSchema);

// Setup controllers
app.register(userRouter);
app.register(taskRouter);
app.register(boardRouter);

export default app;
