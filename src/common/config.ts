import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(path.resolve(), '../../.env'),
});

const config = {
  PORT: process.env.PORT ?? '4000',
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOGGIN_LEVEL: process.env.LOGGIN_LEVEL ?? '1'
};

export default config;
