import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { ColumnEntity } from '../entities';
import { ColumnDto } from '../dto';

@Injectable()
export class ColumnProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return () => {
      this.mapper.createMap(ColumnEntity, ColumnDto);
    };
  }
}