// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as fastify from 'fastify';
import { LoggerPlugin } from '../../plugins/logger';

// eslint-disable-next-line no-redeclare
declare module 'fastify' {
  
  interface FastifyInstance {
    logger: LoggerPlugin;
    auth:
      | fastify.onRequestHookHandler
      | fastify.preValidationHookHandler
      | fastify.preHandlerHookHandler;
  }

  interface FastifyRequest {
    /**
     * Hashes a string and returns a promise
     * which resolves with the has result.
     */
    bcryptHash: (pwd: string) => Promise<string>
    
    /**
     * Hashes data and then compares it to a hash,
     * returns a promise that resolves with the 
     * result of the comparison.
     */
    bcryptCompare: (data: string, hash: string) => Promise<boolean>
  }
}
