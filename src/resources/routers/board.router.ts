import { FastifyPluginCallback } from 'fastify';
import {
  getBoard,
  getBoards,
  putBoard,
  postBoard,
  deleteBoard,
} from '../controllers';
import opts from './opts/board.opts.json';
import { boardSchemas, columnSchemas } from '../schemas';

/**
 * Set board routes with request and response schemas
 * @param app - Instance of app
 * @param opts - Options
 * @param done - Done callback
 * @returns void
 */
const boardRoutes: FastifyPluginCallback = (app, _, done): void => {
  // Add user schemas.
  app.addSchema(boardSchemas.board);
  app.addSchema(boardSchemas.boardGet);
  app.addSchema(boardSchemas.boardPost);

  app.addSchema(columnSchemas.column);
  app.addSchema(columnSchemas.columnPost);

  app.get('/boards', opts.getBoards, getBoards);
  app.get('/boards/:boardId', opts.getBoard, getBoard);
  app.put('/boards/:boardId', opts.putBoard, putBoard);
  app.post('/boards', opts.postBoard, postBoard);
  app.delete('/boards/:boardId', opts.deleteBoard, deleteBoard);

  done();
};

export default boardRoutes;
