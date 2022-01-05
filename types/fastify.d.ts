import { LoggerPlugin } from '../plugins/logger';

declare module 'fastify' {
  export interface FastifyInstance {
    logger?: LoggerPlugin;
  }
}
