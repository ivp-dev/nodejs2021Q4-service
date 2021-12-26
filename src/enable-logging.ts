import { FastifyInstance, FastifyRequest } from 'fastify';
import logger, {LoggerPlugin} from '../plugins/logger';

const stringifyRequest = (req: FastifyRequest) => {
  const { hostname, url, params, body, method } = req;

  return `Method: ${method}, host: ${hostname},url: ${url}, query params: ${JSON.stringify(
    params
  )} body: ${JSON.stringify(body)}`;
};

interface FastifyInstanceLoggerEnabled {
  logger: LoggerPlugin
}

function isFastifyInstanceLoggerEnabled(obj: unknown): obj is FastifyInstanceLoggerEnabled {
  if(typeof obj === 'object') {
    return !!obj && 'logger' in obj;
  }

  return false;
}

const enableLogging = async (fastify: FastifyInstance) => {
  fastify.register(logger);

  if(!isFastifyInstanceLoggerEnabled(fastify)) {
    return;
  }

  process.on('uncaughtException', async (error) => {
    fastify.logger.error(error.message);
  });

  process.on('unhandledRejection', async (error) => {
    if (error instanceof Error) {
      fastify.logger.error(error.message)
    }
  });

  fastify.addHook('preHandler', async (req, _rep, done) => {
    fastify.logger.info(stringifyRequest(req));
    done();
  });

  fastify.addHook('onError', async (_req, _rep, error, done) => {
    // fastify.logger.error();
    done();
  });

  fastify.addHook('onResponse', (_req, rep, done) => {
    // fastify.logger.info();
    done();
  });
};

export default enableLogging;
