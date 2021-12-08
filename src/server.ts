import config from './common/config';
import app from './app';

const { PORT } = config;

const start = async () => {
  try {
    app.listen(PORT);
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
};

start();
