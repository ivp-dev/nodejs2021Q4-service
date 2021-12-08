import { v4 as uuidv4 } from 'uuid';
import state from '../../state';
import { UserModel } from '../../types';

/**
 * Get all users
 * @returns List of users
 */
const getAll = async (): Promise<UserModel[]> => state.users

/**
 * Get user by id
 * @param id - User identifier
 * @returns User
 */
const getById = async (id: string): Promise<UserModel | undefined> => {
  const user = state.users.find(u => u.id === id);
  return user;
}

/**
 * Create new user
 * @param userData - User data
 * @returns User
 */
const createUser = async (userData: UserModel): Promise<UserModel> => {
  const newUser = { ...userData, id: uuidv4() }
  return newUser;
}

/**
 * Add user to store
 * @param user - User 
 */
const addUser = async (user: UserModel): Promise<void> => {
  state.users.push(user);
}

/**
 * Update stored user by id
 * @param id - User identifier
 * @param userData - User data
 * @returns User
 */
const updateUserById = async (id: string, userData: UserModel): Promise<UserModel | null> => {
  const userIndex = state.users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return null;
  }

  const targetUser = state.users[userIndex];
  const updatedUser = { ...targetUser, ...userData, id: targetUser.id };
  state.users.splice(userIndex, 1, updatedUser);

  return updatedUser;
}

/**
 * Delete stored user
 * @param id - User identifier
 */
const deleteUser = async (id: string): Promise<void> => {
  const userIndex = state.users.findIndex(u => u.id === id);

  if (userIndex !== -1) {
    state.users.splice(userIndex, 1);
  }
}

export default {
  getAll,
  getById,
  addUser,
  deleteUser,
  createUser,
  updateUserById
}
