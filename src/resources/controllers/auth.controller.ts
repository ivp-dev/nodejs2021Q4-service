import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards';
import { Identity } from '../../common/decorators'
import { Identity as User } from '../../types';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Identity() user: User): Promise<{ token: string }> {
    return this.authService.login(user);
  }
}
