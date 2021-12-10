import config from './common/config';
import app from './app';

/**
 * Starting the server
 */
const start = async () => {
  try {
    app.listen(config.PORT);
  } catch (e) {
    app.log.error(e);
    throw e;
  }
};

start();
