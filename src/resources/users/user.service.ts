import usersRepo from './user.memory.repository';
import taskRepo from '../tasks/task.memory.repository';
import { UserModel } from '../../types';

/**
 * Get all users
 * @returns List of users
 */
const getAll = (): Promise<UserModel[]> => usersRepo.getAll();

/**
 * Get user by identifier
 * @param id Identifier of the user
 * @returns User
 */
const getById = async (id: string): Promise<UserModel | undefined> => usersRepo.getById(id);

/**
 * Store user
 * @param user User to add
 * @returns User
 */
const addUser = async (user: UserModel): Promise<UserModel> => {
  const newUser = await usersRepo.createUser(user);
  await usersRepo.addUser(newUser);
  return newUser;
}

/**
 * Update stored user
 * @param id User identifier
 * @param user User data
 * @returns Updated user data
 */
const updateUser = async (id: string, user: UserModel): Promise<UserModel | null> => {
  const updatedUser = await usersRepo.updateUserById(id, user);
  return updatedUser;
}

/**
 * Delete stored user
 * @param id User identifier
 */
const deleteUser = async (id: string): Promise<void> => {
  await Promise.all([
    usersRepo.deleteUser(id),
    taskRepo.unassignUserTasks(id)
  ]);
}

export default {
  getAll,
  getById,
  addUser,
  updateUser,
  deleteUser
}
