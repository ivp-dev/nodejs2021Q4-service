import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';
import allowFastifyMultipart from 'fastify-multipart';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './resources/modules/app.module';
import { CommonExceptionFilter } from './resources/filters';

import config from './common/config';

function isFastifyResolver(obj: unknown): obj is NestFastifyApplication {
  return config.USE_FASTIFY;
}

async function platformFactory(isFastify: boolean) {
  return isFastify
    ? NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
      )
    : NestFactory.create<NestExpressApplication>(
        AppModule,
        new ExpressAdapter()
      );
}

async function bootstrap() {
  const app: NestFastifyApplication | NestExpressApplication =
    await platformFactory(config.USE_FASTIFY);

  const httpAdapterHost = app.get(HttpAdapterHost);
  const logger = app.get(Logger);

  app.useGlobalFilters(new CommonExceptionFilter(httpAdapterHost));
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(logger);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('RS School task api')
    .setDescription('Api example build on nest.js')
    .setVersion('1.0')
    .addTag('Finaly done :)')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  if (isFastifyResolver(app)) {
    app.register(allowFastifyMultipart);
  }

  app.enableCors({
    origin: '*',
  });

  const { PORT, HOST } = config;

  await app.listen(PORT, HOST);
}

bootstrap();
