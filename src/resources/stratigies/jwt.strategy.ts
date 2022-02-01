import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import config from '../../common/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.JWT_SECRET_KEY,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async validate(payload: {
    sub: string;
    username: string;
  }): Promise<{ userId: string; login: string }> {
    return { userId: payload.sub, login: payload.username };
  }
}
