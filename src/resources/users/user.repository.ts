import { EntityManager, EntityRepository } from 'typeorm';
import { UserModel } from '../../types';
import { UserEntity } from './user.entity'

@EntityRepository(UserEntity)
class UserRepository {

  constructor(private manager: EntityManager) { }

  /**
 * Get all users
 * @returns Promise List of users
 */
  getUsers = async (): Promise<UserModel[]> => {
    const users = this.manager.find(UserEntity);
    return users;
  }

  /**
   * Get user by id
   * @param id - User identifier
   * @returns Promise User
   */
  getUserById = async (id: string): Promise<UserModel | undefined> => {
    const user = await this.manager.findOne(UserEntity, { id });
    return user;
  }

  /**
   * Create new user
   * @param userData - User data
   * @returns Promise User
   */
  createUser = async (userData: UserModel): Promise<UserModel> => {
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
    userData: UserModel
  ): Promise<UserModel | undefined> => {
    await this.manager.update(UserEntity, { id }, userData);
    const updatedUser = await this.manager.findOne(UserEntity, { where: { id } });
    return updatedUser;
  };

  /**
   * Delete stored user
   * @param id - User identifier
   * @returns Promise void
   */
  deleteUser = async (id: string): Promise<void> => {
    await this.manager.delete(UserEntity, { id })
  };
}

export default UserRepository;