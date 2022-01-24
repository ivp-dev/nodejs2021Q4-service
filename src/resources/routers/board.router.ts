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
import { BoardEntity } from '../entities';

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

  app.get(
    '/boards',
    {
      ...opts.getBoards,
      preValidation: [app.auth],
    },
    getBoards
  );

  app.get<{
    Params: {
      boardId: string;
    };
  }>(
    '/boards/:boardId',
    {
      ...opts.getBoard,
      preValidation: [app.auth],
    },
    getBoard
  );

  app.put<{
    Params: {
      boardId: string;
    };
    Body: BoardEntity;
  }>(
    '/boards/:boardId',
    {
      ...opts.putBoard,
      preValidation: [app.auth],
    },
    putBoard
  );

  app.post<{
    Body: BoardEntity;
  }>(
    '/boards',
    {
      ...opts.postBoard,
      preValidation: [app.auth],
    },
    postBoard
  );

  app.delete<{
    Params: {
      boardId: string;
    };
  }>(
    '/boards/:boardId',
    {
      ...opts.deleteBoard,
      preValidation: [app.auth],
    },
    deleteBoard
  );

  done();
};

export default boardRoutes;
