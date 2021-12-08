// Require the framework and instantiate it
const fastify = require('fastify');
const swagger = require('fastify-swagger');
const { NODE_ENV } = require('./common/config');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const userSchemas = require('./resources/users/schemas');
const boardSchemas = require('./resources/boards/schemas');
const columnSchemas = require('./resources/columns/schemas');
const taskSchemas = require('./resources/tasks/schemas');

/**
 * @type {FastifyInstance}
 */
const app = fastify({ logger: NODE_ENV === 'development' });

// Set swagger docs
app.register(swagger, {
  mode: 'static',
  routePrefix: '/doc',
  specification: { path: './doc/api.yaml' },
  exposeRoute: true
});

// Add user schemas
app.addSchema(userSchemas.user)
app.addSchema(userSchemas.userGet);
app.addSchema(userSchemas.userPost);

// Add task schemas
app.addSchema(taskSchemas.task);
app.addSchema(taskSchemas.taskPost);

// Add board schemas
app.addSchema(boardSchemas.board);
app.addSchema(boardSchemas.boardPost);

// Add column schemas
app.addSchema(columnSchemas.columnSchema)
app.addSchema(columnSchemas.columnPostSchema)

// Setup plugin
app.register(userRouter);
app.register(taskRouter);
app.register(boardRouter);

module.exports = app;