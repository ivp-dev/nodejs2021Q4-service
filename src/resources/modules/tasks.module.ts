import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../entities';
import { TasksRepository } from '../repositories';
import { TasksController } from '../controllers';
import { TasksService } from '../services';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [TypeOrmModule.forFeature([TaskEntity, TasksRepository])],
})
export class TasksModule {}
