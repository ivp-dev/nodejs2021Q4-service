import { Module } from '@nestjs/common';
import {
  BaseProfile,
  BoardProfile,
  ColumnProfile,
  UserProfile,
  TaskProfile
} from '../profiles';

@Module({
  providers: [
    BaseProfile,
    BoardProfile,
    ColumnProfile,
    UserProfile,
    TaskProfile,
  ],
})
export class MapperModule {}
