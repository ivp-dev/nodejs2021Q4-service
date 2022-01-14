import { EntityManager, EntityRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import state from '../../state';
import { TaskModel } from '../../types';
import { TaskEntity } from './task.entity';

@EntityRepository(TaskEntity)
class TaskRepository {

  constructor(private manager: EntityManager) { }

  /**
   * Get all tasks
   * @param boardId - Board identifier
   * @returns Promise Array of tasks
   */
  getTasks = async (boardId: string): Promise<TaskModel[]> => {
    const result = await this.manager.find(TaskEntity, { where: { boardId } });
    return result;
  }

  /**
   * Get task
   * @param boardId - Board identifier
   * @param taskId - Task identifier
   * @returns Promise Task
   */
  getTaskById = async (boardId: string, taskId: string): Promise<TaskModel | undefined> => {
    const result = await this.manager.findOne(TaskEntity, { where: { id: taskId, boardId } });
    return result;
  }

  /**
 * Create new task
 * @param boardId - Board identifier
 * @param taskData - Task data
 * @returns Promise Task
 */
  createTask = async (boardId: string, taskData: TaskModel): Promise<TaskModel> => {
    const newTask = this.manager.create(TaskEntity, { ...taskData, boardId: boardId });
    await this.manager.save(TaskEntity, newTask);
    return newTask;
  }

  /**
 * Store task
 * @param task - Task data
 * @returns Promise void
 */
  addTask = async (task: TaskModel): Promise<TaskModel> => {
    await this.manager.insert(TaskEntity, task);
    return task;
  }

  /**
 * Update task
 * @param boardId - Board identifier
 * @param taskId - Task identifier
 * @param taskData - Task data
 * @returns Promise Task
 */
  updateTaskById = async (
    boardId: string,
    taskId: string,
    taskData: TaskModel
  ): Promise<TaskModel | undefined> => {
    await this.manager.update(TaskEntity, { id: taskId, boardId }, taskData);
    const updatedTask = await this.manager.findOne(TaskEntity, { where: { id: taskId } });
    return updatedTask;
  }

  /**
 * Delete task
 * @param boardId - Board identifier
 * @param taskId - Task identifier
 * @returns Promise void
 */
  deleteTask = async (boardId: string, taskId: string): Promise<void> => {
    await this.manager.delete(TaskEntity, { id: taskId, boardId })
  }
}

export default TaskRepository;

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
