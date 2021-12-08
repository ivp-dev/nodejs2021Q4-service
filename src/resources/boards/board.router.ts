import { FastifyPluginCallback } from 'fastify';
import BoardControllers from './board.controller';
import BoardSchemas from './board.opts.json';

/**
 * Set board routes with request and response schemas
 * @param app - Instance of app
 * @param opts - Options
 * @param done - Done callback
 * @returns void
 */
const boardRoutes: FastifyPluginCallback = (app, opts, done): void => {
  app.get('/boards', BoardSchemas.getBoards, BoardControllers.getBoards);
  app.get('/boards/:boardId', BoardSchemas.getBoard, BoardControllers.getBoard);
  app.put('/boards/:boardId', BoardSchemas.putBoard, BoardControllers.putBoard);
  app.post('/boards', BoardSchemas.postBoard, BoardControllers.postBoard);
  app.delete(
    '/boards/:boardId',
    BoardSchemas.deleteBoard,
    BoardControllers.deleteBoard
  );

  done();
};

export default boardRoutes;
