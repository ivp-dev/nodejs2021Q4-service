const tasksRepo = require('./task.memory.repository');
const taskRoutes = require('./task.router');

const getAll = async (boardId) => await tasksRepo.getAll(boardId);

const getById = async (boardId, taskId) => await tasksRepo.getById(boardId, taskId);

const getIndexById = async (id) => await tasksRepo.getById(id);

const addTask = async (task) => {
  const newTask = await tasksRepo.createTask(task);
  await tasksRepo.addTask(newTask);
  return newTask;
}

const updateTask = async (boardId, taskId, task) => {  
  const updatedTask = await tasksRepo.updateTaskById(boardId, taskId, task);
  return updatedTask;
}

const deleteTask = async (boardId, taskId) => {
  return await tasksRepo.deleteTask(boardId, taskId);
}

module.exports = { getAll, getById, addTask, updateTask, deleteTask };
