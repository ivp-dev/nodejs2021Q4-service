/* eslint-disable import/no-cycle */
import { AutoMap } from '@automapper/classes';
import { BaseDto } from './base.dto';
import { BoardDto } from './board.dto';
import { TaskDto } from './task.dto';

export class ColumnDto extends BaseDto{
  @AutoMap()
  boardId?: string;

  @AutoMap()
  title?: string;

  @AutoMap()
  order?: number;

  @AutoMap({ typeFn: () => BoardDto })
  board?: BoardDto;

  @AutoMap({ typeFn: () => TaskDto })
  tasks?: TaskDto[];
}