import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskEntity } from '../entities';
import { TasksService } from '../services';

@Controller()
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/boards/:boardId/tasks')
  async getTasks(@Param('boardId') boardId: string): Promise<TaskEntity[]> {
    const tasks = await this.tasksService.getAll(boardId);
    return tasks;
  }

  @Get('/boards/:boardId/tasks/:taskId')
  async getUser(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ): Promise<TaskEntity | undefined> {
    const user = await this.tasksService.getById(boardId, taskId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post('/boards/:boardId/tasks/')
  async postUser(
    @Param('boardId') boardId: string,
    @Body() task: TaskEntity
  ): Promise<TaskEntity> {
    const newTask = await this.tasksService.addTask(boardId, task);
    return newTask;
  }

  @Put('/boards/:boardId/tasks/:taskId')
  async putUser(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() task: TaskEntity
  ): Promise<TaskEntity> {
    const newTask = await this.tasksService.updateTask(boardId, taskId, task);

    if (!newTask) {
      throw new BadRequestException('Invalid task data');
    }

    return newTask;
  }

  @HttpCode(204)
  @Delete('/boards/:boardId/tasks/:taskId')
  async deleteUser(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ): Promise<void> {
    await this.tasksService.deleteTask(boardId, taskId);
  }
}
