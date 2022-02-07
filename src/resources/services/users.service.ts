import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { UserCreateDto } from '../dto/user-create.dto';
import { UsersRepository } from '../repositories';
import { UserEntity } from '../entities';
import { uow } from '../../common/unit-of-work';
import { UserDto } from '../dto/user.dto';
import { hashString } from '../../common/bcript';

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
    const usersDto = await this.mapper.mapArrayAsync(
      users,
      UserDto,
      UserEntity
    );
    return usersDto;
  }

  /**
   * Store user
   * @param user - User to add
   * @returns User
   */
  async createUser(
    userData: UserCreateDto,
    password: string
  ): Promise<UserDto> {
    const result = uow(this.connection, async () => {
      const userEntity = await this.mapper.mapAsync(
        {
          ...userData,
          password: await hashString(password),
        },
        UserEntity,
        UserCreateDto
      );
      const newUserEntity = this.usersRepository.create(userEntity);
      await this.usersRepository.save(newUserEntity);
      const userDto = await this.mapper.mapAsync(
        newUserEntity,
        UserDto,
        UserEntity
      );
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
    userData: UserCreateDto,
    password: string
  ): Promise<UserDto | undefined> {
    const result = uow(this.connection, async () => {
      const userEntity = await this.mapper.mapAsync(
        {
          ...userData,
          password: await hashString(password),
        },
        UserEntity,
        UserCreateDto
      );
      
      const updatedUserEntity = await this.usersRepository.updateUserById(
        userId,
        userEntity
      );

      if (updatedUserEntity) {
        await this.usersRepository.save(updatedUserEntity);
        const userDto = await this.mapper.mapAsync(
          updatedUserEntity,
          UserDto,
          UserEntity
        );
        return userDto;
      }

      return updatedUserEntity;
    });

    return result;
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
