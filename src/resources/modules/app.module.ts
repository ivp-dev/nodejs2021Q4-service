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
  ],
})
export class AppModule {}
