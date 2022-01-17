import { EntityRepository } from 'typeorm';
import TaskEntity from './task.entity';
import BaseRepository from '../../common/base-repository';

@EntityRepository(TaskEntity)
class TaskRepository extends BaseRepository{

  /**
   * Get all tasks
   * @param boardId - Board identifier
   * @returns Promise Array of tasks
   */
  getTasks = async (boardId: string): Promise<TaskEntity[]> => {
    const result = await this.manager.find(TaskEntity, { where: { boardId } });
    return result;
  }

  /**
   * Get task
   * @param boardId - Board identifier
   * @param taskId - Task identifier
   * @returns Promise Task
   */
  getTaskById = async (boardId: string, taskId: string): Promise<TaskEntity | undefined> => {
    const result = await this.manager.findOne(TaskEntity, { where: { id: taskId, boardId } });
    return result;
  }

  /**
 * Create new task
 * @param boardId - Board identifier
 * @param taskData - Task data
 * @returns Promise Task
 */
  createTask = async (boardId: string, taskData: TaskEntity): Promise<TaskEntity> => {
    const newTask = this.manager.create<TaskEntity>(TaskEntity, { ...taskData, boardId });
    await this.manager.save(TaskEntity, newTask);
    return newTask;
  }

  /**
 * Store task
 * @param task - Task data
 * @returns Promise void
 */
  addTask = async (task: TaskEntity): Promise<TaskEntity> => {
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
    taskData: TaskEntity
  ): Promise<TaskEntity | undefined> => {
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
