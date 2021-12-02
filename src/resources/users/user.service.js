const usersRepo = require('./user.memory.repository');
const userRoutes = require('./user.router');

const getAll = () => usersRepo.getAll();

const getById = async (id) => usersRepo.getById(id);

const postUser = async (user) => {
  const newUser = await usersRepo.createUser(user);
  await usersRepo.addUser(newUser);
  return newUser;
}

module.exports = { getAll, getById, postUser };
