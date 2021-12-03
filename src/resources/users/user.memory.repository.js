const { v4: uuidv4 } = require('uuid');
const state = require('../../state');

const getAll = async () => state.users

const getById = async (id) => {
  const user = state.users.find(u => u.id === id);
  return user;
}

const createUser = async (data) => {
  const newUser = { ...data, id: uuidv4() }
  return newUser;
}

const addUser = async (user) => {
  state.users.push(user);
}

const updateUserById = async (id, userData) => {
  const userIndex = state.users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return null;
  }

  const targetUser = state.users[userIndex];
  const updatedUser = { ...targetUser, ...userData, id: targetUser.id };
  state.users.splice(userIndex, 1, updatedUser);

  return updatedUser;
}

const deleteUser = async (id) => {
  const userIndex = state.users.findIndex(u => u.id === id);

  if(userIndex !== -1) {
    state.users.splice(userIndex, 1);
  }
}

module.exports = {
  getAll,
  getById,
  addUser,
  deleteUser,
  createUser,
  updateUserById
};
