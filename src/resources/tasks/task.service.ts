import { getCustomRepository } from 'typeorm';
import { uow } from '../../common/unit-of-work';
import TaskRepository from './task.repository';
import TaskEntity from './task.entity';

/**
 * Get all tasks of specified board
 * @param boardId - Board identifier
 * @returns List of tasks
 */
const getAll = async (boardId: string): Promise<TaskEntity[]> => {
  const repository = getCustomRepository(TaskRepository);
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
const getById = async (
  boardId: string,
  taskId: string
): Promise<TaskEntity | undefined> => {
  const repository = getCustomRepository(TaskRepository);
  const result = await repository.getTaskById(boardId, taskId);
  return result;
};

/**
 * Add task to specified board.
 * @param boardId - Board identifier
 * @param task - Task identifier
 * @returns Promise Task with generated identifier
 */
const addTask = async (
  boardId: string,
  task: TaskEntity
): Promise<TaskEntity> => {
  const result = await uow(TaskRepository, async (repository) => {
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
const updateTask = async (
  boardId: string,
  taskId: string,
  task: TaskEntity
): Promise<TaskEntity | undefined> => {
  const result = await uow(TaskRepository, async (repository) => {
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
const deleteTask = async (boardId: string, taskId: string): Promise<void> => {
  await uow(TaskRepository, async (repository) => {
    await repository.deleteTask(boardId, taskId);
  })
};

export default {
  getAll,
  getById,
  addTask,
  updateTask,
  deleteTask,
};
