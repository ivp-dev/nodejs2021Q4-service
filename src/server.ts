import { AddressInfo } from 'net';
import config from './common/config';
import app from './app';

const { PORT, HOST } = config;

/**
 * Starting the server
 */
const start = async () => {
  try {
    await app.listen(PORT, HOST);

    const info = app.server.address();

    if (typeof info === 'object' && !!info && (info as AddressInfo).port) {
      app.logger?.info(`server listening on port: ${info.port}`);
    }

  } catch (e) {
    app.logger?.error(e instanceof Error ? e.message : JSON.stringify(e));
    process.exit(1)
  }
};

start();
