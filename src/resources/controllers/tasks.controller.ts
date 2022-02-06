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
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards';
import { TaskEntity } from '../entities';
import { TasksService } from '../services';
import { TaskDto } from '../dto/task.dto';

@ApiTags('Tasks')
@Controller()
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/boards/:boardId/tasks')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: HttpStatus.OK, type: [TaskDto] })
  async getTasks(@Param('boardId') boardId: string): Promise<TaskDto[]> {
    const tasks = await this.tasksService.getAll(boardId);
    return tasks;
  }

  @ApiOperation({ summary: 'Get task by id' })
  @ApiResponse({ status: HttpStatus.OK, type: TaskDto })
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
  @ApiOperation({ summary: 'Task creation' })
  @ApiResponse({ status: HttpStatus.CREATED, type: TaskDto })
  async postUser(
    @Param('boardId') boardId: string,
    @Body() task: TaskEntity
  ): Promise<TaskDto> {
    const newTask = await this.tasksService.addTask(boardId, task);
    return newTask;
  }

  @ApiOperation({ summary: 'Update task by id' })
  @ApiResponse({ status: HttpStatus.OK, type: TaskDto })
  @Put('/boards/:boardId/tasks/:taskId')
  @UseGuards(JwtAuthGuard)
  async putUser(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() task: TaskDto
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
  @ApiOperation({ summary: 'Delete task by id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteUser(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ): Promise<void> {
    await this.tasksService.deleteTask(boardId, taskId);
  }
}
