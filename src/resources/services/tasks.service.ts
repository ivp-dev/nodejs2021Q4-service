import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DeepPartial } from 'typeorm';
import { TaskEntity } from '../entities';
import { TasksRepository } from '../repositories';
import { uow } from '../../common/unit-of-work';
import { TaskDto } from '../../common/dto';
import { mapper } from '../../common/automapper';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
    private connection: Connection
  ) {}

  async getAll(boardId: string): Promise<TaskDto[]> {
    const tasks = await this.tasksRepository.getTasks(boardId);
    const result = mapper.mapArray(tasks, TaskDto, TaskEntity);
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
    const task = await this.tasksRepository.getTaskById(boardId, taskId);
    const result = mapper.map(task, TaskDto, TaskEntity);
    return result;
  }

  /**
   * Add task to specified board.
   * @param boardId - Board identifier
   * @param task - Task identifier
   * @returns Promise Task with generated identifier
   */
  async addTask(
    boardId: string,
    task: DeepPartial<TaskEntity>
  ): Promise<TaskDto> {
    const addedTask = await uow(this.connection, async () => {
      const newTask = await this.tasksRepository.createTask({
        ...task,
        boardId,
      });
      return newTask;
    });

    const dto = await mapper.mapAsync(addedTask, TaskDto, TaskEntity);
    return dto;
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
    task: TaskEntity
  ): Promise<TaskDto | undefined> {
    const updatedTask = await uow(this.connection, async () => {
      const result = await this.tasksRepository.updateTaskById(
        boardId,
        taskId,
        task
      );
      return result;
    });

    const dto = mapper.map(updatedTask, TaskDto, TaskEntity);
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
