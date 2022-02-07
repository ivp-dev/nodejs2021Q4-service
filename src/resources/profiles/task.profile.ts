import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from '../entities';
import { BaseEntity } from '../../common/base-entity';
import { BaseDto } from '../dto/base.dto';
import { TaskDto } from '../dto/task.dto';

@Injectable()
export class TaskProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return () => {
      this.mapper.createMap(TaskEntity, TaskDto, {
        extends: [this.mapper.getMapping(BaseEntity, BaseDto)],
      });
      this.mapper.createMap(TaskDto, TaskEntity, {
        extends: [this.mapper.getMapping(BaseDto, BaseEntity)],
      });
    };
  }
}
