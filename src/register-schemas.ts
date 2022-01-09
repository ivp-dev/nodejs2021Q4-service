import { FastifyInstance } from 'fastify';

import userSchemas from './resources/users/schemas';
import boardSchemas from './resources/boards/schemas';
import columnSchemas from './resources/columns/schemas';
import taskSchemas from './resources/tasks/schemas';

const registerSchemas = (app: FastifyInstance) => {
  [
    // Add user schemas.
    userSchemas.user,
    userSchemas.userGet,
    userSchemas.userPost,
    // Add task schemas.
    taskSchemas.task,
    taskSchemas.taskPost,
    // Add board schemas
    boardSchemas.board,
    boardSchemas.boardPost,
    // Add board schemas
    columnSchemas.columnSchema,
    columnSchemas.columnPostSchema,
  ].reduce((acc, schema) => acc.addSchema(schema), app);
};

export default registerSchemas;
