import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PartialRequired } from '../../types';
import { UserEntity } from '../entities';
import { UsersService } from '../services';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('users')
  async getUsers(): Promise<UserEntity[]> {
    const users = await this.usersService.getAll();
    return users;
  }

  @Get('users/:userId')
  async getUser(
    @Param('userId') userId: string
  ): Promise<UserEntity | undefined> {
    const user = await this.usersService.getById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post('users')
  async postUser(
    @Body() user: PartialRequired<UserEntity, 'password' | 'name' | 'login'>
  ): Promise<UserEntity> {
    const newUser = await this.usersService.createUser(
      user,
      user.password // TODO: hash password
    );
    return newUser;
  }

  @Put('users/:userId')
  async putUser(
    @Param('userId') userId: string,
    @Body() user: PartialRequired<UserEntity, 'password' | 'name' | 'login'>
  ): Promise<UserEntity> {
    const newUser = await this.usersService.updateUser(
      userId,
      user,
      user.password // TODO: hash password
    );

    if (!newUser) {
      throw new BadRequestException('Invalid user data');
    }

    return newUser;
  }

  @HttpCode(204)
  @Delete('users/:userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    await this.usersService.deleteUser(userId);
  }
}
