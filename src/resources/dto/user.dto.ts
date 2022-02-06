/* eslint-disable import/no-cycle */
import { AutoMap } from '@automapper/classes';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from './base.dto';
import { TaskDto } from './task.dto';

export class UserDto extends BaseDto {
  @AutoMap()
  @IsNotEmpty()
  name?: string;

  @AutoMap()
  @IsNotEmpty()
  login?: string;

  @AutoMap({ typeFn: () => TaskDto })
  tasks?: TaskDto[];
}
