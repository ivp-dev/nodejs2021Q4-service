const usersRepo = require('./user.memory.repository');
const userRoutes = require('./user.router');

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
  return await usersRepo.deleteUser(id);
}

module.exports = { getAll, getById, addUser, updateUser, deleteUser };
