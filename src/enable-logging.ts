import { FastifyInstance, FastifyRequest } from 'fastify';
import config from './common/config';
import logger from '../plugins/logger';
import isLoggerEnabled from './utils/is-fastify-instance-logger-enabled';

const stringifyRequest = (req: FastifyRequest) => {
  const { hostname, url, params, body, method } = req;

  return `Method: ${method}, host: ${hostname},url: ${url}, query params: ${JSON.stringify(
    params
  )} body: ${JSON.stringify(body)}`;
};

/**
 * Enable logging
 * @param fastify- Fastify instance
 */
const enableLogging = (fastify: FastifyInstance) => {
  fastify.register(logger, {
    level: parseFloat(config.LOGGIN_LEVEL),
    filePath: 'logs.log',
  });

  process.on('uncaughtException', async (error) => {
    if (!isLoggerEnabled(fastify)) return;

    await fastify.logger.error(error.message);
  });

  process.on('unhandledRejection', async (error) => {
    if (!isLoggerEnabled(fastify)) return;

    await fastify.logger.error(error instanceof Error ? error.message : JSON.stringify(error));
  });

  fastify.addHook('onRequest', async (req, _rep, done) => {
    if (!isLoggerEnabled(fastify)) return;

    await fastify.logger.info(stringifyRequest(req));

    done();
  });

  fastify.addHook('onResponse', async (_req, rep, done) => {
    if (!isLoggerEnabled(fastify)) return;

    await fastify.logger.info(
      `Request completed with status code ${rep.statusCode}`
    );

    done();
  });

  fastify.addHook('onReady', async (done) => {
    if (!isLoggerEnabled(fastify)) return;

    await fastify.logger.warn(
      `Test warn message`
    );

    await fastify.logger.debug(
      `Test debug message`
    );

    done();
  })

  fastify.addHook('onError', async (_req, _rep, error, done) => {
    if (!isLoggerEnabled(fastify)) return;

    await fastify.logger.error(error.message);

    done();
  });

};

export default enableLogging;
