import { TaskModel } from '../../types';
import tasksRepo from './task.memory.repository';

/**
 * Get all tasks of specified board
 * @param boardId - Board identifier
 * @returns List of tasks
 */
const getAll = async (boardId: string): Promise<TaskModel[]> => {
  const result = await tasksRepo.getAll(boardId);
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
): Promise<TaskModel | undefined> => {
  const result = await tasksRepo.getById(boardId, taskId);
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
  task: TaskModel
): Promise<TaskModel> => {
  const newTask = await tasksRepo.createTask(boardId, task);
  await tasksRepo.addTask(newTask);
  return newTask;
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
  task: TaskModel
): Promise<TaskModel | null> => {
  const updatedTask = await tasksRepo.updateTaskById(boardId, taskId, task);
  return updatedTask;
};

/**
 * Delete task from specified board
 * @param boardId - Board identifier
 * @param taskId - Task identifier
 * @returns Promise void
 */
const deleteTask = async (boardId: string, taskId: string): Promise<void> => {
  await tasksRepo.deleteTask(boardId, taskId);
};

export default {
  getAll,
  getById,
  addTask,
  updateTask,
  deleteTask,
};
