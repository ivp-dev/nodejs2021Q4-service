import { AddressInfo } from 'net';
import config from './common/config';
import app from './app';
import isLoggerEnable from './utils/is-logger-enable';

const { PORT } = config;

/**
 * Starting the server
 */
const start = async () => {
  try {
    await app.listen(PORT);

    if (isLoggerEnable(app)) {
      const info = app.server.address();
      if (typeof info === 'object' && !!info && (info as AddressInfo).port) {
        app.logger.info(`server listening on port: ${info.port}`);
      }
    }
  } catch (e) {
    if (isLoggerEnable(app)) {
      app.logger.error(e instanceof Error ? e.message : JSON.stringify(e)); 
    }
  }
};

start();
