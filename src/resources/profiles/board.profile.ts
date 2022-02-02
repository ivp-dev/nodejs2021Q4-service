import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { BoardEntity } from '../entities';
import { BoardDto } from '../dto';

@Injectable()
export class BoardProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return () => {
      this.mapper.createMap(BoardEntity, BoardDto)
        .forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id)
        )
        .forMember(
          (destination) => destination.title,
          mapFrom((source) => source.title)
        );

      this.mapper.createMap(BoardDto, BoardEntity)
        .forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id)
        )
        .forMember(
          (destination) => destination.title,
          mapFrom((source) => source.title)
        );;
    };
  }
}