import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, './../../.env'),
});

const config = {
  PORT: +(process.env.PORT || 4000),
  HOST: process.env.HOST || 'localhost',
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOGGIN_LEVEL: process.env.LOGGIN_LEVEL || '5',
  LOG_FILE_PATH: process.env.LOG_FILE_PATH || './logs/logs.log'
};

export default config;
