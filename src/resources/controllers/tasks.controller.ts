import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards';
import { TaskEntity } from '../entities';
import { TasksService } from '../services';
import { TaskDto } from '../../common/dto';

@Controller()
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/boards/:boardId/tasks')
  @UseGuards(JwtAuthGuard)
  async getTasks(@Param('boardId') boardId: string): Promise<TaskDto[]> {
    const tasks = await this.tasksService.getAll(boardId);
    return tasks;
  }

  
  @Get('/boards/:boardId/tasks/:taskId')
  @UseGuards(JwtAuthGuard)
  async getUser(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ): Promise<TaskDto | undefined> {
    const user = await this.tasksService.getById(boardId, taskId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post('/boards/:boardId/tasks/')
  @UseGuards(JwtAuthGuard)
  async postUser(
    @Param('boardId') boardId: string,
    @Body() task: TaskEntity
  ): Promise<TaskDto> {
    const newTask = await this.tasksService.addTask(boardId, task);
    return newTask;
  }

  @Put('/boards/:boardId/tasks/:taskId')
  @UseGuards(JwtAuthGuard)
  async putUser(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() task: TaskEntity
  ): Promise<TaskDto> {
    const newTask = await this.tasksService.updateTask(boardId, taskId, task);

    if (!newTask) {
      throw new BadRequestException('Invalid task data');
    }

    return newTask;
  }

  @Delete('/boards/:boardId/tasks/:taskId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async deleteUser(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ): Promise<void> {
    await this.tasksService.deleteTask(boardId, taskId);
  }
}
