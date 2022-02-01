import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services';
import { Identity } from '../../types';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'login'
    });
  }

  async validate(login: string, password: string): Promise<Identity | null> {
    const identity = await this.authService.validateUser(login, password);
    if (!identity) {
      throw new UnauthorizedException();
    }
    return identity;
  }
}
