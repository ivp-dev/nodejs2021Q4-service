import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards';
import { Identity } from '../decorators'
import * as Types from '../../types';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Identity() identity: Types.Identity): Promise<{ token: string }> {
    return this.authService.login(identity);
  }
}
