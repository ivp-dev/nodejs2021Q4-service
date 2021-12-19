import { v4 as uuidv4 } from 'uuid';
import state from '../../state';
import { TaskModel } from '../../types';

/**
 * Get all tasks
 * @param boardId - Board identifier
 * @returns Promise Array of tasks
 */
const getAll = async (boardId: string) => {
  const result = state.tasks.filter((task) => task.boardId === boardId);
  return result;
};

/**
 * Get task
 * @param boardId - Board identifier
 * @param taskId - Task identifier
 * @returns Promise Task
 */
const getById = async (
  boardId: string,
  taskId: string
): Promise<TaskModel | undefined> => {
  const task = state.tasks.find(
    (t) => t.id === taskId && t.boardId === boardId
  );
  return task;
};

/**
 * Create new task
 * @param boardId - Board identifier
 * @param taskData - Task data
 * @returns Promise Task
 */
const createTask = async (
  boardId: string,
  taskData: TaskModel
): Promise<TaskModel> => {
  const newTask = { ...taskData, id: uuidv4(), boardId };
  return newTask;
};

/**
 * Store task
 * @param task - Task data
 * @returns Promise void
 */
const addTask = async (task: TaskModel): Promise<void> => {
  state.tasks.push(task);
};

/**
 * Update task
 * @param boardId - Board identifier
 * @param taskId - Task identifier
 * @param taskData - Task data
 * @returns Promise Task
 */
const updateTaskById = async (
  boardId: string,
  taskId: string,
  taskData: TaskModel
): Promise<TaskModel | null> => {
  const taskIndex = state.tasks.findIndex(
    (t) => t.boardId === boardId && t.id === taskId
  );

  if (taskIndex === -1) {
    return null;
  }

  const targetTask = state.tasks[taskIndex];
  const updatedTask = { ...targetTask, ...taskData, id: taskId, boardId };

  state.tasks.splice(taskIndex, 1, updatedTask);

  return updatedTask;
};
/**
 * Delete task
 * @param boardId - Board identifier
 * @param taskId - Task identifier
 * @returns Promise void
 */
const deleteTask = async (boardId: string, taskId: string): Promise<void> => {
  const taskIndex = state.tasks.findIndex(
    (t) => t.id === taskId && t.boardId === boardId
  );

  if (taskIndex !== -1) {
    state.tasks.splice(taskIndex, 1);
  }
};

/**
 * Clear tasks of specified board
 * @param boardId - Board identifier
 * @returns Promise void
 */
const deleteBoardTasks = async (boardId: string): Promise<void> => {
  let idx = state.tasks.length;
  while (idx) {
    idx -= 1;
    if (state.tasks[idx].boardId === boardId) {
      state.tasks.splice(idx, 1);
    }
  }
};

/**
 * Clear tasks of specified user
 * @param userId - User identifier
 * @returns Promise void
 */
const deleteUserTasks = async (userId: string): Promise<void> => {
  let idx = state.tasks.length;
  while (idx) {
    idx -= 1;
    if (state.tasks[idx].userId === userId) {
      state.tasks.splice(idx, 1);
    }
  }
};

/**
 * Unassign user tasks
 * @param userId - User identifier
 * @returns Promise void
 */
const unassignUserTasks = async (userId: string): Promise<void> => {
  let idx = state.tasks.length;
  while (idx) {
    idx -= 1;
    if (state.tasks[idx].userId === userId) {
      state.tasks[idx].userId = null;
    }
  }
};

export default {
  getAll,
  getById,
  addTask,
  deleteTask,
  createTask,
  updateTaskById,
  deleteUserTasks,
  deleteBoardTasks,
  unassignUserTasks,
};
