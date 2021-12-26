import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify';
import fp from 'fastify-plugin';

type NextCallback = (error?: FastifyError) => void

const loggerPlugin = async (
  fastify: FastifyInstance, 
  options: FastifyPluginOptions, 
  next: NextCallback): Promise<void> => { 
  
    const internalOptions = {level: 1, ...options};

    const logger = async (type: string, message: object) => {
      process.stdout.write(`${type}, message: ${JSON.stringify(message)}`)
    }

    const info = async (message: object) => {
      if(internalOptions.level < 3) return;
      await logger('info', message);
    }

    const debug = async (message: object) => {
      if(internalOptions.level < 3) return;
      await logger('debug', message);
    }

    fastify.decorate('logger', {
      info,
      debug
    })


  next?.();
}


export default fp(loggerPlugin)