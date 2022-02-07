import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { ColumnEntity } from '../entities';
import { ColumnDto } from '../dto/column.dto';
import { BaseEntity } from '../../common/base-entity';
import { BaseDto } from '../dto/base.dto';

@Injectable()
export class ColumnProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return () => {
      this.mapper.createMap(ColumnEntity, ColumnDto, {
        extends: [this.mapper.getMapping(BaseEntity, BaseDto)],
      });
      this.mapper.createMap(ColumnDto, ColumnEntity, {
        extends: [this.mapper.getMapping(BaseDto, BaseEntity)],
      });
    };
  }
}
