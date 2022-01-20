import { FastifyPluginCallback } from 'fastify';
import * as TaskControllers from './task.controller';
import TaskSchemas from './task.opts.json';

/**
 * Apply task routes with request and response schemas
 * @param app - Instance of app
 * @param opts - Options
 * @param done - Done callback
 * @returns void
 */
const taskRoutes: FastifyPluginCallback = (app, opts, done): void => {
  app.get(
    '/boards/:boardId/tasks',
    TaskSchemas.getTasks,
    TaskControllers.getTasks
  );
  app.get(
    '/boards/:boardId/tasks/:taskId',
    TaskSchemas.getTask,
    TaskControllers.getTask
  );
  app.put(
    '/boards/:boardId/tasks/:taskId',
    TaskSchemas.putTask,
    TaskControllers.putTask
  );
  app.post(
    '/boards/:boardId/tasks',
    TaskSchemas.postTask,
    TaskControllers.postTask
  );
  app.delete(
    '/boards/:boardId/tasks/:taskId',
    TaskSchemas.deleteTask,
    TaskControllers.deleteTask
  );

  done();
};

export default taskRoutes;
