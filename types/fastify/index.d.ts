// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as fastify from 'fastify';
import { LoggerPlugin } from '../../plugins/logger';

// eslint-disable-next-line no-redeclare
declare module 'fastify' {
  export type Test = string;
  export interface FastifyInstance {
    logger: LoggerPlugin;
    auth:
      | fastify.onRequestHookHandler
      | fastify.preValidationHookHandler
      | fastify.preHandlerHookHandler;
  }
}
