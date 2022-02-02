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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards';
import { PartialRequired } from '../../types';
import { UserEntity } from '../entities';
import { UsersService } from '../services';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('users')
  @UseGuards(JwtAuthGuard)
  async getUsers(): Promise<UserEntity[]> {
    const users = await this.usersService.getAll();
    return users;
  }

  @Get('users/:userId')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Delete('users/:userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    await this.usersService.deleteUser(userId);
  }
}
