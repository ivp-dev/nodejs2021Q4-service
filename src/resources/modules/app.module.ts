import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
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
    AutomapperModule.forRoot({
      options: [{ name: 'mapper', pluginInitializer: classes }],
      singular: true,
    }),
  ],
})
export class AppModule {}
