const usersRepo = require('./user.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = async (id) => usersRepo.getById(id);

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
  await usersRepo.deleteUser(id);
  await taskRepo.unassignUserTasks(id);
}

module.exports = { getAll, getById, addUser, updateUser, deleteUser };
