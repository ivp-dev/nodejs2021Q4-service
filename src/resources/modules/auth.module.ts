import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../services';
import { JwtStrategy, LocalAuthStrategy } from '../stratigies';
import config from '../../common/config';
import { AuthController } from '../controllers';
import { UsersModule } from './users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: config.JWT_SECRET_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthStrategy, JwtStrategy],
  exports: [JwtModule, AuthService, PassportModule],
})
export class AuthModule {}
