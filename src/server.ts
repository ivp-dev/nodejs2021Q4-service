import { AddressInfo } from 'net';
import config from './common/config';
import app from './app';
import isFastifyInstanceLoggerEnabled from './utils/is-fastify-instance-logger-enabled';

const { PORT } = config;

/**
 * Starting the server
 */
const start = async () => {
  try {
    await app.listen(PORT);

    if (isFastifyInstanceLoggerEnabled(app)) {
      const info = app.server.address();
      if (typeof info === 'object' && !!info && (info as AddressInfo).port) {
        app.logger.info(`server listening on ${info.port}`);
      }
    }
  } catch (e) {
    if (isFastifyInstanceLoggerEnabled(app)) {
      if (e instanceof Error) app.logger.error(`${e.message}`);
    }
  }
};

start();
