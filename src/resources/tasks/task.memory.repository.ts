import { v4 as uuidv4 } from 'uuid';
import state from '../../state';
import { BoardModel, TaskModel } from '../../types';

const getAll = async (boardId: string) => {
  const result = state.tasks.filter(task => task.boardId === boardId);
  return result;
}


const getById = async (boardId: string, taskId: string): Promise<TaskModel | undefined> => {
  const task = state.tasks.find(t => t.id === taskId && t.boardId === boardId);
  return task;
}

const createTask = async (boardId: string, taskData: TaskModel): Promise<TaskModel> => {
  const newTask = { ...taskData, id: uuidv4(), boardId }
  return newTask;
}

const addTask = async (task: TaskModel): Promise<void> => {
  state.tasks.push(task);
}

const updateTaskById = async (boardId: string, taskId: string, taskData: TaskModel): Promise<TaskModel | null> => {
  const taskIndex = state.tasks.findIndex(t => t.boardId === boardId && t.id === taskId);

  if (taskIndex === -1) {
    return null;
  }

  const targetTask = state.tasks[taskIndex];
  const updatedTask = { ...targetTask, ...taskData, id: taskId, boardId };

  state.tasks.splice(taskIndex, 1, updatedTask);

  return updatedTask;
}

const deleteTask = async (boardId: string, taskId: string): Promise<void> => {
  const taskIndex = state.tasks.findIndex(t => t.id === taskId && t.boardId === boardId);

  if (taskIndex !== -1) {
    state.tasks.splice(taskIndex, 1);
  }
}

const deleteBoardTasks = async (boardId: string): Promise<void> => {
  let idx = state.tasks.length
  while (idx) {
    idx -= 1;
    if (state.tasks[idx].boardId === boardId) {
      state.tasks.splice(idx, 1);
    }
  }
}

const deleteUserTasks = async (userId: string): Promise<void> => {
  let idx = state.tasks.length
  while (idx) {
    idx -= 1;
    if (state.tasks[idx].userId === userId) {
      state.tasks.splice(idx, 1);
    }
  }
}

const unassignUserTasks = async (userId: string): Promise<void> => {
  let idx = state.tasks.length
  while (idx) {
    idx -= 1;
    if (state.tasks[idx].userId === userId) {
      state.tasks[idx].userId = null;
    }
  }
}

export default {
  getAll,
  getById,
  addTask,
  deleteTask,
  createTask,
  updateTaskById,
  deleteUserTasks,
  deleteBoardTasks,
  unassignUserTasks
};
