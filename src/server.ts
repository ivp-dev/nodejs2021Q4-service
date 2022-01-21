import { AddressInfo } from 'net';
import { createConnection } from 'typeorm';
import fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import swagger from 'fastify-swagger';
// import auth from 'fastify-basic-auth';
import config from './common/config';
import auth from '../plugins/auth';
import logger from '../plugins/logger';
import app from './app';

import 'reflect-metadata';

const stringifyRequest = (req: FastifyRequest) => {
  const { hostname, url, params, body, method } = req;

  return `Method: ${method}, host: ${hostname}, url: ${url}, query params: ${JSON.stringify(
    params
  )} body: ${JSON.stringify(body)}`;
};

const { PORT, HOST } = config;

const server = fastify();

/**
 * Starting the server
 */
const start = async (): Promise<void> => {
  await Promise.all([
    await server.register(logger, {
      level: parseFloat(config.LOGGIN_LEVEL),
      filePath: config.LOG_FILE_PATH,
    }),

    await server.register(swagger, {
      routePrefix: '/doc',
      specification: {
        baseDir: './doc',
        path: '/api.yaml',
      },
      exposeRoute: true,
    }),

    await server.register(auth, {
      validate: async (result, _req, _reply, done) => {
        server.logger.info(
          `auth try: ${JSON.stringify({
            result,
          })}`
        );

        done();
      },
    }),
  ]);

  server.setErrorHandler(
    async (
      err: FastifyError,
      _: FastifyRequest,
      res: FastifyReply
    ): Promise<void> => {
      if (err.statusCode && err.statusCode >= 400) {
        // this was unauthorized! Display the correct page/message.
        await res.code(err.statusCode).send({ was: 'Unauthorized' });
      }

      if (err.statusCode && err.statusCode >= 500) {
        await res.code(err.statusCode).send({ was: 'Internal Server Error' });
      }
    }
  );

  //
  // server.addHook('preHandler', server.auth);

  server.addHook('preHandler', async (req, _res, done) => {
    await server.logger.info(stringifyRequest(req));
    done();
  });

  server.addHook('onResponse', async (_req, rep, done) => {
    await server.logger.info(
      `Request completed with status code ${rep.statusCode}`
    );
    done();
  });

  server.addHook('onReady', async (done) => {
    await Promise.all([
      server.logger.warn('Test warn message'),
      server.logger.debug('Test debug message'),
    ]);

    done();
  });

  server.addHook('onError', async (_req, _rep, error, done) => {
    await server.logger.error(error.message);
    done();
  });

  process.on('uncaughtException', async (error: Error) => {
    // eslint-disable-next-line no-console
    console.log(error.message);
    // TODO: cause an error: 'write after close' 
    // await server.logger.error(`${error.message}: ${error.stack}`);

    process.exit(1);
  });

  process.on('unhandledRejection', async (error: Error) => {
    // eslint-disable-next-line no-console
    console.log(error.message);
    // TODO: cause an error: 'write after close' 
    /* await server.logger.error(
      error instanceof Error ? error.message : JSON.stringify(error)
    ); */

    process.exit(1);
  });

  await server.register(app);

  await createConnection();

  await server.listen(PORT, HOST);

  const info = server.server.address();

  if (!!info && typeof info === 'object' && (info as AddressInfo).port) {
    server.logger.info(`server listening on port: ${info.port}`);
  }
};

start().catch((error: Error) => {
  // eslint-disable-next-line no-console
  console.log(error.message);

  // server.logger.error(error.message);

  process.exit(1);
});
