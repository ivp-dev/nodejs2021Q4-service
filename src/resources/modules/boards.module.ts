import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from '../entities';
import { BoardsController } from '../controllers';
import { BoardsRepository } from '../repositories';
import { BoardsService } from '../services';
import { BoardProfile } from '../profiles/board.profile';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, BoardProfile],
  imports: [TypeOrmModule.forFeature([BoardEntity, BoardsRepository])],
})
export class BoardsModule {}
