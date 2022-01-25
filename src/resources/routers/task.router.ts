import { FastifyPluginCallback } from 'fastify';
import {
  getTask,
  getTasks,
  deleteTask,
  putTask,
  postTask,
} from '../controllers';
import opts from './opts/task.opts.json';
import { taskSchemas } from '../schemas';
import { TaskEntity } from '../entities';

/**
 * Apply task routes with request and response schemas
 * @param app - Instance of app
 * @param opts - Options
 * @param done - Done callback
 * @returns void
 */
const taskRoutes: FastifyPluginCallback = (app, _, done): void => {
  app.addSchema(taskSchemas.task);
  app.addSchema(taskSchemas.taskPost);

  app.get<{ Params: { boardId: string } }>('/boards/:boardId/tasks', {
    ...opts.getTasks,
    preValidation: [app.auth]
  }, getTasks);

  app.get<{
    Params: {
      boardId: string;
      taskId: string;
    };
  }>('/boards/:boardId/tasks/:taskId', {
    ...opts.getTask,
    preValidation: [app.auth]
  }, getTask);

  app.put<{
    Params: {
      boardId: string;
      taskId: string;
    };
    Body: TaskEntity;
  }>('/boards/:boardId/tasks/:taskId', {
    ...opts.putTask,
    preValidation: [app.auth]
  }, putTask);

  app.post<{
    Params: {
      boardId: string;
    };
    Body: TaskEntity;
  }>('/boards/:boardId/tasks', {
    ...opts.postTask,
    preValidation: [app.auth]
  }, postTask);

  app.delete<{
    Params: {
      boardId: string;
      taskId: string;
    };
  }>('/boards/:boardId/tasks/:taskId', {
    ...opts.deleteTask,
    preValidation: [app.auth],
  }, deleteTask);

  done();
};

export default taskRoutes;
