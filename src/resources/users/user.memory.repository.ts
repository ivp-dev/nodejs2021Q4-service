import { v4 as uuidv4 } from 'uuid';
import state from '../../state';
import { UserModel } from '../../types';

/**
 * Get all users
 * @deprecated The method should not be used
 * @returns Promise List of users
 */
const getAll = async (): Promise<UserModel[]> => state.users;

/**
 * Get user by id
 * @deprecated The method should not be used
 * @param id - User identifier
 * @returns Promise User
 */
const getById = async (id: string): Promise<UserModel | undefined> => {
  const user = state.users.find((u) => u.id === id);
  return user;
};

/**
 * Create new user
 * @deprecated The method should not be used
 * @param userData - User data
 * @returns Promise User
 */
const createUser = async (userData: UserModel): Promise<UserModel> => {
  const newUser = { ...userData, id: uuidv4() };
  return newUser;
};

/**
 * Add user to store
 * @deprecated The method should not be used
 * @param user - User
 * @returns Promise void
 */
const addUser = async (user: UserModel): Promise<void> => {
  state.users.push(user);
};

/**
 * Update stored user by id
 * @deprecated The method should not be used
 * @param id - User identifier
 * @param userData - User data
 * @returns Promise User
 */
const updateUserById = async (
  id: string,
  userData: UserModel
): Promise<UserModel | null> => {
  const userIndex = state.users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return null;
  }

  const targetUser = state.users[userIndex];
  const updatedUser = { ...targetUser, ...userData, id: targetUser.id };
  state.users.splice(userIndex, 1, updatedUser);

  return updatedUser;
};

/**
 * Delete stored user
 * @deprecated The method should not be used
 * @param id - User identifier
 * @returns Promise void
 */
const deleteUser = async (id: string): Promise<void> => {
  const userIndex = state.users.findIndex((u) => u.id === id);

  if (userIndex !== -1) {
    state.users.splice(userIndex, 1);
  }
};

export default {
  getAll,
  getById,
  addUser,
  deleteUser,
  createUser,
  updateUserById,
};
