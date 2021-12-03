const usersRepo = require('./user.memory.repository');
const userRoutes = require('./user.router');
const taskRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = async (id) => usersRepo.getById(id);

const getIndexById = async (id) => usersRepo.getById(id);

const addUser = async (user) => {
  const newUser = await usersRepo.createUser(user);
  await usersRepo.addUser(newUser);
  return newUser;
}

const updateUser = async (id, user) => {
  const updatedUser = await usersRepo.updateUserById(id, user);
  return updatedUser;
}

const deleteUser = async (id) => {
  const result = await usersRepo.deleteUser(id);

  if (result > 0) {
    
    await taskRepo.unassignUserTasks(id);
  }

  return result;
}

module.exports = { getAll, getById, addUser, updateUser, deleteUser };
