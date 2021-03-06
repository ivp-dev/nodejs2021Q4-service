import { EntityRepository } from 'typeorm';
import BaseRepository from '../../common/base-repository';
import UserEntity from './user.entity'

@EntityRepository(UserEntity)
class UserRepository extends BaseRepository {

  /**
 * Get all users
 * @returns Promise List of users
 */
  getUsers = async (): Promise<UserEntity[]> => {
    const users = this.manager.find(UserEntity);
    return users;
  }

  /**
   * Get user by id
   * @param id - User identifier
   * @returns Promise User
   */
  getUserById = async (id: string): Promise<UserEntity | undefined> => {
    const user = await this.manager.findOne(UserEntity, { id });
    return user;
  }

  /**
   * Create new user
   * @param userData - User data
   * @returns Promise User
   */
  createUser = async (userData: UserEntity): Promise<UserEntity> => {
    const newUser = this.manager.create(UserEntity, userData);
    await this.manager.save(UserEntity, newUser);
    return newUser;
  }

  /**
   * Update stored user by id
   * @param id - User identifier
   * @param userData - User data
   * @returns Promise User
   */
  updateUserById = async (
    id: string,
    userData: UserEntity
  ): Promise<UserEntity | undefined> => {
    await this.manager.update(UserEntity, { id }, userData);
    const updatedUser = await this.manager.findOne(UserEntity, { id });
    return updatedUser;
  };

  /**
   * Delete stored user
   * @param id - User identifier
   * @returns Promise void
   */
  deleteUser = async (id: string): Promise<void> => {
    // await this.manager.delete(UserEntity, { id })
    const user = await this.manager.findOne(UserEntity, { id });
    await this.manager.remove(user);
  };
}

export default UserRepository;