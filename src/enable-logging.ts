import { FastifyInstance, FastifyRequest } from 'fastify';
import config from './common/config';
import logger from '../plugins/logger';
import isLoggerEnabled from './utils/is-logger-enable';

const stringifyRequest = (req: FastifyRequest) => {
  const { hostname, url, params, body, method } = req;

  return `Method: ${method}, host: ${hostname}, url: ${url}, query params: ${JSON.stringify(
    params
  )} body: ${JSON.stringify(body)}`;
};

/**
 * Enable logging
 * @param fastify- Fastify instance
 */
const enableLogging = (app: FastifyInstance) => {
  
  process.on('uncaughtException', async (error) => {
    if (!isLoggerEnabled(app)) return;
    await app.logger.error(`${error.message}: ${error.stack}`);
  });

  process.on('unhandledRejection', async (error) => {
    if (!isLoggerEnabled(app)) return;
    await app.logger.error(error instanceof Error ? error.message : JSON.stringify(error));
  });

  app.addHook('preHandler', async (req, _rep, done) => {
    if (!isLoggerEnabled(app)) return;
    await app.logger.info(stringifyRequest(req));

    done();
  });

  app.addHook('onResponse', async (_req, rep, done) => {
    if (!isLoggerEnabled(app)) return;
    
    await app.logger.info(
      `Request completed with status code ${rep.statusCode}`
    );

    done();
  });

  app.addHook('onReady', async (done) => {
    if (!isLoggerEnabled(app)) return;

    await app.logger.warn(
      `Test warn message`
    );

    await app.logger.debug(
      `Test debug message`
    );

    done();
  });

  app.addHook('onError', async (_req, _rep, error, done) => {
    if (!isLoggerEnabled(app)) return;

    await app.logger.error(error.message);

    done();
  });

  app.register(logger, {
    level: parseFloat(config.LOGGIN_LEVEL),
    filePath: 'logs.log',
  });

};

export default enableLogging;
