import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { LoggerModule } from 'nestjs-pino';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Modules from '.';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    Modules.BoardsModule,
    Modules.TasksModule,
    Modules.UsersModule,
    Modules.AuthModule,
    Modules.MapperModule,
    AutomapperModule.forRoot({
      options: [{ name: 'mapper', pluginInitializer: classes }],
      singular: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        
      }
    })
  ],
})
export class AppModule {}
