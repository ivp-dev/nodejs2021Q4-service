import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards';
import { PartialRequired } from '../../types';
import { UserEntity } from '../entities';
import { UsersService } from '../services';
import { UserDto } from '../dto/user.dto';
import { UserCreateDto } from '../dto/user-create.dto';


@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('users')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: [UserDto] })
  async getUsers(): Promise<UserDto[]> {
    const users = await this.usersService.getAll();
    return users;
  }

  @Get('users/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto })
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
  @ApiOperation({ summary: 'Create user by id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserCreateDto })
  async postUser(
    @Body() user: PartialRequired<UserCreateDto, 'password'>
  ): Promise<UserDto> {
    const newUser = await this.usersService.createUser(
      user,
      user.password // TODO: hash password
    );
    return newUser;
  }

  @Put('users/:userId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({ status: HttpStatus.OK, type: UserCreateDto })
  async putUser(
    @Param('userId') userId: string,
    @Body() userData: PartialRequired<UserCreateDto, 'password' | 'name' | 'login'>
  ): Promise<UserDto> {
    const updatedUser = await this.usersService.updateUser(
      userId,
      userData,
      userData.password // TODO: hash password
    );

    if (!updatedUser) {
      throw new BadRequestException('Invalid user data');
    }

    return updatedUser;
  }

  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @Delete('users/:userId')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    await this.usersService.deleteUser(userId);
  }
}
