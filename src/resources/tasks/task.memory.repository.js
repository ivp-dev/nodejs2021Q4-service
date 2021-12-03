const { v4: uuidv4 } = require('uuid');
const state = require('../../state');

const getAll = async (boardId) => {
  const result = state.tasks.filter(task => task.boardId === boardId);
  return result;
}

const getById = async (boardId, taskId) => {
  const task = state.tasks.find(task => task.id === taskId && task.boardId === boardId);
  return task;
}

const createTask = async (data) => {
  const newTask = { ...data, id: uuidv4() }
  return newTask;
}

const addTask = async (task) => {
  state.tasks.push(task);
}

const updateTaskById = async (boardId, taskId, taskData) => {
  const taskIndex = state.tasks.findIndex(t => t.boardId === boardId && t.id == taskId);

  if (taskIndex === -1) {
    return;
  }

  const targetTask = state.tasks[taskIndex];
  const updatedTask = { ...targetTask, ...taskData, id: targetTask.id }; //Id needed to avoid overriding with incoming id
  state.tasks.splice(taskIndex, 1, updatedTask);

  return updatedTask;
}

const deleteTask = async (boardId, taskId) => {
  const taskIndex = state.tasks.findIndex(t => t.id === taskId && t.boardId === boardId);

  if (taskIndex === -1) {
    return taskIndex;
  }

  state.tasks.splice(taskIndex, 1);

  return 1;
}

const deleteBoardTasks = async (boardId) => {
  const tasksIndecesToDelete = state.tasks.reduce((acc, task, idx) => {
    if (task.boardId === boardId) {
      acc.push(idx);
    } return acc;
  }, []);

  if (tasksIndecesToDelete.length > 0) {
    tasksIndecesToDelete.forEach(idx => {
      state.tasks.splice(idx, 1)
    });
  }
}

const deleteUserTasks = async (userId) => {
  const tasksIndecesToDelete = state.tasks.reduce((acc, task, idx) => {
    if (task.userId === userId) {
      acc.push(idx)
    } return acc;
  }, []);

  if (tasksIndecesToDelete.length > 0) {
    tasksIndecesToDelete.forEach(idx => state.tasks.splice(idx, 1));
  }
}

const unassignUserTasks = async (userId) => {
  const tasksIndecesToUnassign = state.tasks.reduce((acc, task, idx) => {
    if (task.userId === userId) {
      acc.push(idx)
    } return acc;
  }, []);

  if (tasksIndecesToUnassign.length > 0) {
    tasksIndecesToUnassign.forEach(idx => {
      state.tasks[idx].userId = null;
    });
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
