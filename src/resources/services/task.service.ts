import { getCustomRepository } from 'typeorm';
import { uow } from '../../common/unit-of-work';
import { taskRepository } from '../repositories';
import TaskEntity from '../entities/task.entity';

/**
 * Get all tasks of specified board
 * @param boardId - Board identifier
 * @returns List of tasks
 */
export const getAll = async (boardId: string): Promise<TaskEntity[]> => {
  const repository = getCustomRepository(taskRepository);
  const result = await repository.getTasks(boardId);
  return result;
};

/**
 * Get task by id of specified board
 *
 * @param boardId - Board identifier
 * @param taskId - Task identifier
 * @returns Promise Task with specified identifier
 */
export const getById = async (
  boardId: string,
  taskId: string
): Promise<TaskEntity | undefined> => {
  const repository = getCustomRepository(taskRepository);
  const result = await repository.getTaskById(boardId, taskId);
  return result;
};

/**
 * Add task to specified board.
 * @param boardId - Board identifier
 * @param task - Task identifier
 * @returns Promise Task with generated identifier
 */
export const addTask = async (
  boardId: string,
  task: TaskEntity
): Promise<TaskEntity> => {
  const result = await uow(taskRepository, async (repository) => {
    const newTask = await repository.createTask(boardId, task);
    return newTask;
  });

  return result;
};

/**
 * Update task of specified board.
 * @param boardId - Board identifier
 * @param taskId - Task identifier
 * @param task - Target task
 * @returns Return Promise with updated task or null if not found
 */
export const updateTask = async (
  boardId: string,
  taskId: string,
  task: TaskEntity
): Promise<TaskEntity | undefined> => {
  const result = await uow(taskRepository, async (repository) => {
    const updatedTask = await repository.updateTaskById(boardId, taskId, task);
    return updatedTask;
  });

  return result;
};

/**
 * Delete task from specified board
 * @param boardId - Board identifier
 * @param taskId - Task identifier
 * @returns Promise void
 */
export const deleteTask = async (
  boardId: string,
  taskId: string
): Promise<void> => {
  await uow(taskRepository, async (repository) => {
    await repository.deleteTask(boardId, taskId);
  });
};
