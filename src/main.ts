import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';
import { AppModule } from './resources/modules/app.module';
import { CommonExceptionFilter } from './resources/filters';
import config from './common/config';

async function platformFactory(isFastify: boolean) {
  return isFastify
    ? NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
    : NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
}

async function bootstrap() {
  const app: NestFastifyApplication | NestExpressApplication = await platformFactory(config.USE_FASTIFY);
  const httpAdapterHost = app.get(HttpAdapterHost);
  const logger = app.get(Logger);

  app.useGlobalFilters(new CommonExceptionFilter(httpAdapterHost));
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(logger)

  const { PORT, HOST } = config;

  await app.listen(PORT, HOST);
}

bootstrap();
