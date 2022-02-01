import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services';
import { Identity } from '../../types';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(login: string, password: string): Promise<Identity | null> {
    console.log(login);
    const identity = await this.authService.validateUser(login, password);
    if (!identity) {
      throw new UnauthorizedException();
    }
    return identity;
  }
}
