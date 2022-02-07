/* eslint-disable import/no-cycle */
import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { BaseDto } from './base.dto';
import { BoardDto } from './board.dto';
import { TaskDto } from './task.dto';

export class ColumnDto extends BaseDto{
  @AutoMap()
  boardId?: string;

  @IsNotEmpty()
  @AutoMap()
  title?: string;

  @IsNotEmpty()
  @IsNumber()
  @AutoMap()
  order?: number;

  @AutoMap({ typeFn: () => BoardDto })
  board?: BoardDto;

  @AutoMap({ typeFn: () => TaskDto })
  tasks?: TaskDto[];
}