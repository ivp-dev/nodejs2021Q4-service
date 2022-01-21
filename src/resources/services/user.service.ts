import { getCustomRepository } from 'typeorm';
import { userRepository } from '../repositories';
import { uow } from '../../common/unit-of-work';
import UserEntity from '../entities/user.entity';

/**
 * Get all users
 * @returns Promise List of users
 */
export const getAll = async (): Promise<UserEntity[]> => {
  const repository = getCustomRepository(userRepository);
  const users = await repository.getUsers();
  return users;
};

/**
 * Get user by identifier
 * @param id - Identifier of the user
 * @returns User
 */
export const getById = async (id: string): Promise<UserEntity | undefined> => {
  const repository = getCustomRepository(userRepository);
  const user = await repository.getUserById(id);
  return user;
};

/**
 * Store user
 * @param user - User to add
 * @returns User
 */
export const createUser = async (userData: UserEntity): Promise<UserEntity> => {
  const newUser = await uow(userRepository, async (repository) => {
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
export const updateUser = async (
  id: string,
  user: UserEntity
): Promise<UserEntity | undefined> => {
  const updatedUser = await uow(userRepository, async (repository) => {
    const result = await repository.updateUserById(id, user);
    return result;
  });

  return updatedUser;
};

/**
 * Delete stored user
 * @param id - User identifier
 */
export const deleteUser = async (id: string): Promise<void> => {
  await uow(userRepository, async (repository) => {
    await repository.deleteUser(id);
  });
};
