/* eslint-disable import/no-cycle */
import { AutoMap } from '@automapper/classes';
import { BaseDto } from './base.dto';
import { BoardDto } from './board.dto';
import { ColumnDto } from './column.dto';
import { UserDto } from './user.dto';

export class TaskDto extends BaseDto {
  @AutoMap()
  boardId?: string;

  @AutoMap()
  userId?: string;

  @AutoMap()
  columnId?: string;

  @AutoMap()
  title?: string;

  @AutoMap()
  order?: number;

  @AutoMap()
  description?: string;

  @AutoMap({ typeFn: () => BoardDto })
  board?: BoardDto;

  @AutoMap({ typeFn: () => UserDto })
  user?: UserDto;

  @AutoMap({ typeFn: () => ColumnDto })
  column?: ColumnDto;
}