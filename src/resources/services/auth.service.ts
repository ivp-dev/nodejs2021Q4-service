import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { Identity } from '../../types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<Identity | null> {
    const user = await this.usersService.getByName(username);
    if (user && user.id && user.login && user.password === password) {
      return { userId: user.id, login: user.login };
    }
    return null;
  }

  async login(identity: Identity) {
    return {
      token: this.jwtService.sign(identity),
    };
  }
}
