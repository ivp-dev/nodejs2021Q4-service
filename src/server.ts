import config from './common/config';
import app from './app';
import isFastifyInstanceLoggerEnabled from './utils/is-fastify-instance-logger-enabled';

const { PORT } = config;

/**
 * Starting the server
 */
const start = async () => {
  try {
    app.listen(PORT);
  } catch (e) {
    if (isFastifyInstanceLoggerEnabled(app)) {
      if (e instanceof Error) app.logger.error(`${e.message}`);
    }
  }
};

start();
