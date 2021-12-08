const { v4: uuidv4 } = require('uuid');
const state = require('../../state');

const getAll = async (boardId) => {
  const result = state.tasks.filter(task => task.boardId === boardId);
  return result;
}
/**
 * 
 * @param {string} boardId 
 * @param {string} taskId 
 * @returns {Promise<object>}
 */
const getById = async (boardId, taskId) => {
  const task = state.tasks.find(t => t.id === taskId && t.boardId === boardId);
  return task;
}

const createTask = async (boardId, data) => {
  const newTask = { ...data, id: uuidv4(), boardId }
  return newTask;
}

const addTask = async (task) => {
  state.tasks.push(task);
}

const updateTaskById = async (boardId, taskId, data) => {
  const taskIndex = state.tasks.findIndex(t => t.boardId === boardId && t.id === taskId);

  if (taskIndex === -1) {
    return null;
  }

  const targetTask = state.tasks[taskIndex];
  const updatedTask = { ...targetTask, ...data, id: taskId, boardId }; 

  state.tasks.splice(taskIndex, 1, updatedTask);

  return updatedTask;
}

const deleteTask = async (boardId, taskId) => {
  const taskIndex = state.tasks.findIndex(t => t.id === taskId && t.boardId === boardId);

  if (taskIndex !== -1) {
    state.tasks.splice(taskIndex, 1);
  }
}

const deleteBoardTasks = async (boardId) => {
  let idx = state.tasks.length
  while(idx) {
    idx -= 1;
    if(state.tasks[idx].boardId === boardId) {
      state.tasks.splice(idx, 1);
    }
  }
}

const deleteUserTasks = async (userId) => {
  let idx = state.tasks.length
  while(idx) {
    idx -= 1;
    if(state.tasks[idx].userId === userId) {
      state.tasks.splice(idx, 1);
    }
  }
}

const unassignUserTasks = async (userId) => {
  let idx = state.tasks.length
  while(idx) {
    idx -= 1;
    if(state.tasks[idx].userId === userId) {
      state.tasks[idx].userId = null;
    }
  }
}

module.exports = {
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
