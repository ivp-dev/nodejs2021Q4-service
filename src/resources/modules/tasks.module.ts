import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../entities';
import { TasksRepository } from '../repositories';
import { TasksController } from '../controllers';
import { TasksService } from '../services';
import { TaskProfile } from '../profiles/task.profile';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TaskProfile],
  imports: [TypeOrmModule.forFeature([TaskEntity, TasksRepository])],
})
export class TasksModule {}
