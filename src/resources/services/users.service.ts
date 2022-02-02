import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { UserDto } from '../dto';
import { UsersRepository } from '../repositories';
import { UserEntity } from '../entities';
import { uow } from '../../common/unit-of-work';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectMapper()
    private mapper: Mapper,
    private connection: Connection
  ) {}

  /**
   * Get all users
   * @returns Promise List of users
   */
  async getAll(): Promise<UserDto[]> {
    const users = await this.usersRepository.getUsers();
    const usersDto = await this.mapper.mapArrayAsync(users, UserDto, UserEntity)
    return usersDto;
  }

  /**
   * Store user
   * @param user - User to add
   * @returns User
   */
  async createUser(
    userData: UserDto,
    hashedPassword: string
  ): Promise<UserDto> {
    const result = uow(this.connection, async () => {
      const userEntity = await this.mapper.mapAsync({
        ...userData,
        password: hashedPassword,
      }, UserEntity, UserDto)
      const newUserEntity = this.usersRepository.create(userEntity);
      await this.usersRepository.save(newUserEntity);
      const userDto = await this.mapper.mapAsync(newUserEntity, UserDto, UserEntity)
      return userDto;
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
