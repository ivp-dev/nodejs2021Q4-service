import { getCustomRepository } from 'typeorm';
import UserRepository from './user.repository';
import { uow } from '../../common/unit-of-work';
import UserEntity from './user.entity';

/**
 * Get all users
 * @returns Promise List of users
 */
const getAll = async (): Promise<UserEntity[]> => {
  const repository = getCustomRepository(UserRepository);
  const users = await repository.getUsers();
  return users
};

/**
 * Get user by identifier
 * @param id - Identifier of the user
 * @returns User
 */
const getById = async (id: string): Promise<UserEntity | undefined> => {
  const repository = getCustomRepository(UserRepository);
  const user = await repository.getUserById(id);
  return user;
}

/**
 * Store user
 * @param user - User to add
 * @returns User
 */
const createUser = async (userData: UserEntity): Promise<UserEntity> => {
  const newUser = await uow(UserRepository, async (repository) => {
    const user = await repository.createUser(userData);
    return user;
  });

  return newUser;
};

/**
 * Update stored user
 * @param id - User identifier
 * @param user - User data
 * @returns Updated user data
 */
const updateUser = async (
  id: string,
  user: UserEntity
): Promise<UserEntity | undefined> => {
  const updatedUser = await uow(UserRepository, async (repository) => {
    const result = await repository.updateUserById(id, user);
    return result;
  });

  return updatedUser;
};

/**
 * Delete stored user
 * @param id - User identifier
 */
const deleteUser = async (id: string): Promise<void> => {
  await uow(UserRepository, async (repository) => {
    await repository.deleteUser(id);
  })
};

export default {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteUser,
};
