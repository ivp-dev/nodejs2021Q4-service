import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { BoardEntity } from '../entities';
import { BaseEntity } from '../../common/base-entity';
import { BaseDto } from '../dto/base.dto';
import { BoardDto } from '../dto/board.dto';

@Injectable()
export class BoardProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return () => {
      this.mapper.createMap(BoardEntity, BoardDto, {
        extends: [this.mapper.getMapping(BaseEntity, BaseDto)],
      });
      this.mapper.createMap(BoardDto, BoardEntity, {
        extends: [this.mapper.getMapping(BaseDto, BaseEntity)],
      });
    };
  }
}
