/* eslint-disable import/no-cycle */
import { AutoMap } from '@automapper/classes';
import { BaseDto } from './base.dto';
import { TaskDto } from './task.dto';

export class UserDto extends BaseDto {
  @AutoMap()
  name?: string;

  @AutoMap()
  login?: string;

  @AutoMap({ typeFn: () => TaskDto })
  tasks?: TaskDto[];
}
