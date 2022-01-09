import { FastifyInstance, FastifyRequest } from 'fastify';
import config from './common/config';
import logger from '../plugins/logger';

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
    await app.logger?.error(`${error.message}: ${error.stack}`);
  });

  process.on('unhandledRejection', async (error) => {
    await app.logger?.error(error instanceof Error ? error.message : JSON.stringify(error));
  });

  app.addHook('preHandler', async (req, _rep, done) => {
    await app.logger?.info(stringifyRequest(req));

    done();
  });

  app.addHook('onResponse', async (_req, rep, done) => {
    await app.logger?.info(
      `Request completed with status code ${rep.statusCode}`
    );

    done();
  });

  app.addHook('onReady', async (done) => {
    await app.logger?.warn(
      `Test warn message`
    );

    await app.logger?.debug(
      `Test debug message`
    );

    done();
  });

  app.addHook('onError', async (_req, _rep, error, done) => {
    await app.logger?.error(error.message);

    done();
  });

  app.register(logger, {
    level: parseFloat(config.LOGGIN_LEVEL),
    filePath: config.LOG_FILE_PATH,
  });

};

export default enableLogging;
