import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, './../../.env'),
});

const config = {
  PORT: +(process.env.PORT || 4000),
  HOST: process.env.HOST || 'localhost',
  NODE_ENV: process.env.NODE_ENV,
  USE_FASTIFY: process.env.USE_FASTIFY?.toLowerCase() === 'true' ?? false,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'my secret',
  LOGGIN_LEVEL: process.env.LOGGIN_LEVEL || '5',
  LOG_FILE_PATH: process.env.LOG_FILE_PATH || './logs/logs.log',
  TYPEORM_CONNECTION: process.env.TYPEORM_CONNECTION,
  TYPEORM_HOST: process.env.TYPEORM_HOST,
  TYPEORM_USERNAME: process.env.TYPEORM_USERNAME,
  TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD,
  TYPEORM_DATABASE: process.env.TYPEORM_DATABASE,
  TYPEORM_PORT: +(process.env.TYPEORM_PORT || 5432),
  TYPEORM_SYNCHRONIZE: process.env.TYPEORM_SYNCHRONIZE,
  TYPEORM_LOGGING: process.env.TYPEORM_LOGGING,
  TYPEORM_ENTITIES: process.env.TYPEORM_ENTITIES,
  TYPEORM_MIGRATIONS: process.env.TYPEORM_MIGRATIONS,
  TYPEORM_MIGRATIONS_TABLE_NAME: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
};

export default config;
