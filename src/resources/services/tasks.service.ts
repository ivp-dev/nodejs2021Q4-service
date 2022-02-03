import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { TaskEntity } from '../entities';
import { TasksRepository } from '../repositories';
import { uow } from '../../common/unit-of-work';
import { TaskDto } from '../dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
    @InjectMapper()
    private mapper: Mapper,
    private connection: Connection
  ) { }

  async getAll(boardId: string): Promise<TaskDto[]> {
    const tasks = await this.tasksRepository.getTasks(boardId);
    const result = this.mapper.mapArray(tasks, TaskDto, TaskEntity);
    return result;
  }

  /**
   * Get task by id of specified board
   *
   * @param boardId - Board identifier
   * @param taskId - Task identifier
   * @returns Promise Task with specified identifier
   */
  async getById(boardId: string, taskId: string): Promise<TaskDto | undefined> {
    const taskEntity = await this.tasksRepository.getTaskById(boardId, taskId);
    const taskDto = await this.mapper.mapAsync(taskEntity, TaskDto, TaskEntity);
    return taskDto;
  }

  /**
   * Add task to specified board.
   * @param boardId - Board identifier
   * @param task - Task identifier
   * @returns Promise Task with generated identifier
   */
  async addTask(
    boardId: string,
    taskData: TaskDto
  ): Promise<TaskDto> {
    const taskEntity = await uow(this.connection, async () => {
      const mappedTaskEntity = this.mapper.map({ ...taskData, boardId }, TaskEntity, TaskDto);
      const addedTaskEntity = await this.tasksRepository.createTask(mappedTaskEntity);
      return addedTaskEntity;
    });

    const taskDto = await this.mapper.mapAsync(taskEntity, TaskDto, TaskEntity);
    return taskDto;
  }

  /**
   * Update task of specified board.
   * @param boardId - Board identifier
   * @param taskId - Task identifier
   * @param task - Target task
   * @returns Return Promise with updated task or null if not found
   */
  async updateTask(
    boardId: string,
    taskId: string,
    taskData: TaskDto
  ): Promise<TaskDto | undefined> {
    const taskEntity = await uow(this.connection, async () => {
      const mappedTaskEntity = this.mapper.map({ ...taskData, id: taskId, boardId }, TaskEntity, TaskDto);
      const updatedTaskEntity = await this.tasksRepository.updateTaskById(
        boardId,
        taskId,
        mappedTaskEntity
      );
      return updatedTaskEntity;
    });

    const dto = this.mapper.map(taskEntity, TaskDto, TaskEntity);
    return dto;
  }

  /**
   * Delete task from specified board
   * @param boardId - Board identifier
   * @param taskId - Task identifier
   * @returns Promise void
   */
  async deleteTask(boardId: string, taskId: string): Promise<void> {
    await uow(this.connection, async () => {
      await this.tasksRepository.deleteTask(boardId, taskId);
    });
  }
}
