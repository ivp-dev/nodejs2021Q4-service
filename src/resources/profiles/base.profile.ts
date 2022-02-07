import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { BaseEntity } from '../../common/base-entity';
import { BaseDto } from '../dto/base.dto';

@Injectable()
export class BaseProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return () => {
      this.mapper.createMap(BaseEntity, BaseDto);
      this.mapper.createMap(BaseDto, BaseEntity);
    };
  }
}