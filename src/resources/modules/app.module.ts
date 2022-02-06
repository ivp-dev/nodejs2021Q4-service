import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { LoggerModule } from 'nestjs-pino';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { logger, serializers } from '../../common/logger';
import * as Modules from '.';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AutomapperModule.forRoot({
      options: [{ name: 'mapper', pluginInitializer: classes }],
      singular: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        logger,
        serializers,
        wrapSerializers: true,
      },
    }),
    Modules.FileModule,
    Modules.BoardsModule,
    Modules.TasksModule,
    Modules.UsersModule,
    Modules.AuthModule,
    Modules.MapperModule,
  ],
})
export class AppModule {}
