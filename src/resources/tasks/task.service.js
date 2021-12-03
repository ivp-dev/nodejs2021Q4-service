const tasksRepo = require('./task.memory.repository');

const getAll = async (boardId) => {
  const result = await tasksRepo.getAll(boardId);
  return result;
};

const getById = async (boardId, taskId) => {
  const result = await tasksRepo.getById(boardId, taskId);
  return result;
};

const addTask = async (boardId, task) => {
  const newTask = await tasksRepo.createTask(boardId, task);
  await tasksRepo.addTask(newTask);
  return newTask;
}

const updateTask = async (boardId, taskId, task) => {  
  const updatedTask = await tasksRepo.updateTaskById(boardId, taskId, task);
  return updatedTask;
}

const deleteTask = async (boardId, taskId) => {
  await tasksRepo.deleteTask(boardId, taskId);
}

module.exports = { getAll, getById, addTask, updateTask, deleteTask };
