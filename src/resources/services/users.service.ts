import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersRepository } from '../repositories';
import { UserEntity } from '../entities';
import { uow } from '../../common/unit-of-work';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private connection: Connection
  ) {}

  /**
   * Get all users
   * @returns Promise List of users
   */
  async getAll(): Promise<UserEntity[]> {
    const users = await this.usersRepository.getUsers();
    return users;
  }

  /**
   * Store user
   * @param user - User to add
   * @returns User
   */
  async createUser(
    userData: UserEntity,
    hashedPassword: string
  ): Promise<UserEntity> {
    const result = uow(this.connection, async () => {
      const user = this.usersRepository.create({
        ...userData,
        password: hashedPassword,
      });

      await this.usersRepository.save(user);

      return user;
    });

    return result;
  }

  /**
   * Get user by identifier
   * @param id - Identifier of the user
   * @returns User
   */
  async getById(id: string): Promise<UserEntity | undefined> {
    const user = await this.usersRepository.getUserById(id);
    return user;
  }

  /**
   * Get user by name
   * @param login - user name
   * @returns User
   */
  async getByName(login: string): Promise<UserEntity | undefined> {
    const user = await this.usersRepository.getUserByName(login);
    return user;
  }

  /**
   * Update stored user
   * @param id - User identifier
   * @param user - User data
   * @returns Updated user data
   */
  async updateUser(
    userId: string,
    user: UserEntity,
    hashedPassword: string
  ): Promise<UserEntity | undefined> {
    const updatedUser = await uow(this.connection, async () => {
      const result = await this.usersRepository.updateUserById(userId, {
        ...user,
        password: hashedPassword,
      });
      return result;
    });

    return updatedUser;
  }

  /**
   * Delete stored user
   * @param id - User identifier
   */
  async deleteUser(id: string): Promise<void> {
    await uow(this.connection, async () => {
      await this.usersRepository.deleteUser(id);
    });
  }
}
