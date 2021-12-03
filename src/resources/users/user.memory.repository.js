const { v4: uuidv4 } = require('uuid');

let state = {
  users: []
}

const getAll = async () => state.users

const getById = async (id) => {
  const user = state.users.find(user => user.id === id);
  return user;
}

const getIndexById = async (id) => state.users.findIndex((u => u.id === id));

const createUser = async (data) => {
  const newUser = { ...data, id: uuidv4() }
  return newUser;
}

const addUser = async (user) => {
  state.users.push(user);
  //state = { ...state, users: [...state.users, user] }
}

const updateUserById = async (id, userData) => {
  const userIndex = state.users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return;
  }

  const targetUser = state.users[userIndex];
  const updatedUser = { ...targetUser, ...userData, id: targetUser.id }; //Id needed to avoid overriding with incoming id
  state.users.splice(userIndex, 1, updatedUser);

  return updatedUser;
  // state = {
  //   ...state, users: [
  //     ...state.users.slice(0, userIndex),
  //     updatedUser 
  //     ...state.user.slice(userIndex + 1, state.users.length)
  //   ]
  // }
}

const deleteUser = async (id) => {
  const userIndex = state.users.findIndex(u => u.id === id);

  if(userIndex === -1) {
    return userIndex;
  }

  state.users.splice(userIndex, 1);

  return 1;
}

module.exports = {
  getAll,
  getById,
  addUser,
  deleteUser,
  createUser,
  updateUserById
};
