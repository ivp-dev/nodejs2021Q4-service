import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from '../entities';
import { BoardsController } from '../controllers';
import { BoardsRepository } from '../repositories';
import { BoardsService } from '../services';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [TypeOrmModule.forFeature([BoardEntity, BoardsRepository])],
})
export class BoardsModule {}
