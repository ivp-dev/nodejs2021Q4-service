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

const enableLogging = (fastify: FastifyInstance) => {

  fastify.register(logger, {
    level: parseFloat(config.LOGGIN_LEVEL),
  });

  process.on('uncaughtException', async (error) => {
    if (!isLoggerEnabled(fastify)) {
      return;
    }

    fastify.logger.error(error.message);
  });

  process.on('unhandledRejection', async (error) => {
    if (!isLoggerEnabled(fastify)) {
      return;
    }

    if (error instanceof Error) {
      fastify.logger.error(error.message);
    }
  });

  fastify.addHook('onRequest', (req, _rep, done) => {
    if (!isLoggerEnabled(fastify)) {
      return;
    }

    const message = stringifyRequest(req);
    fastify.logger.info(message);
    done();
  });

  fastify.addHook('onError', async (_req, _rep, error, done) => {
    if (!isLoggerEnabled(fastify)) {
      return;
    }

    fastify.logger.error(error.message);

    done();
  });

  fastify.addHook('onResponse', (_req, rep, done) => {
    if (!isLoggerEnabled(fastify)) {
      return;
    }

    const message = `Request completed with status code ${rep.statusCode}`;

    fastify.logger.info(message);

    done();
  });

};

export default enableLogging;
