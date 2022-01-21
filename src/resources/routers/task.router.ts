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

  app.get('/boards/:boardId/tasks', opts.getTasks, getTasks);
  app.get('/boards/:boardId/tasks/:taskId', opts.getTask, getTask);
  app.put('/boards/:boardId/tasks/:taskId', opts.putTask, putTask);
  app.post('/boards/:boardId/tasks', opts.postTask, postTask);
  app.delete('/boards/:boardId/tasks/:taskId', opts.deleteTask, deleteTask);

  done();
};

export default taskRoutes;
