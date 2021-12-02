const { v4: uuidv4 } = require('uuid');

let state = {
  users: [{ id: 1, name: "test", login: "test", password: "123" }]
}

const getAll = async () => state.users

const getById = async (id) => {
  const user = state.users.find(user => user.id === id);
  return user;
}

const createUser = async (data) => {
  const newUser = { ...data, id: uuidv4() }
  return newUser;
}

const addUser = async (user) => {
  state = { ...state, users: [...state.users, user] }
}

module.exports = {
  getAll,
  getById,
  addUser,
  createUser
};
