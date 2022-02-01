import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities';
import { UsersController } from '../controllers';
import { UsersRepository } from '../repositories';
import { UsersService } from '../services';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([UserEntity, UsersRepository])],
})
export class UsersModule {}
