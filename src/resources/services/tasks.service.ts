import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DeepPartial } from 'typeorm';
import { TaskEntity } from '../entities';
import { TasksRepository } from '../repositories';
import { uow } from '../../common/unit-of-work';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
    private connection: Connection
  ) {}

  async getAll(boardId: string): Promise<TaskEntity[]> {
    const result = await this.tasksRepository.getTasks(boardId);
    return result;
  }

  /**
   * Get task by id of specified board
   *
   * @param boardId - Board identifier
   * @param taskId - Task identifier
   * @returns Promise Task with specified identifier
   */
  async getById(
    boardId: string,
    taskId: string
  ): Promise<TaskEntity | undefined> {
    const result = await this.tasksRepository.getTaskById(boardId, taskId);
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
  ): Promise<TaskEntity> {
    const result = await uow(this.connection, async () => {
      const newTask = await this.tasksRepository.createTask({
        ...task,
        boardId,
      });
      return newTask;
    });

    return result;
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
  ): Promise<TaskEntity | undefined> {
    const result = await uow(this.connection, async () => {
      const updatedTask = await this.tasksRepository.updateTaskById(
        boardId,
        taskId,
        task
      );
      return updatedTask;
    });

    return result;
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
