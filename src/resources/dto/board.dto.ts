/* eslint-disable import/no-cycle */
import { AutoMap } from '@automapper/classes';
import { BaseDto } from './base.dto';
import { ColumnDto } from './column.dto';
import { TaskDto } from './task.dto';

export class BoardDto extends BaseDto {
  @AutoMap()
  title?: string;

  @AutoMap({ typeFn: () => ColumnDto })
  columns?: ColumnDto[];

  @AutoMap({ typeFn: () => TaskDto })
  tasks?: TaskDto[];
}
