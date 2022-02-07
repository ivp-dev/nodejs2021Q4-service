import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from '../repositories';
import { TasksController } from '../controllers';
import { TasksService } from '../services';
import { TaskEntity } from '../entities';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [TypeOrmModule.forFeature([TaskEntity, TasksRepository])],
})
export class TasksModule {}
