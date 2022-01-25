import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Modules from './resources/modules';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    Modules.BoardsModule,
    Modules.TasksModule,
    Modules.UsersModule,
  ],
})
export class AppModule {}
