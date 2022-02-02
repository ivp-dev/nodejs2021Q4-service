import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from '../entities';
import { TaskDto } from '../dto';

@Injectable()
export class TaskProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return () => {
      this.mapper.createMap(TaskEntity, TaskDto)
        .forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id)
        )
        .forMember(
          (destination) => destination.boardId,
          mapFrom((source) => source.boardId)
        )
        .forMember(
          (destination) => destination.userId,
          mapFrom((source) => source.userId)
        )
        .forMember(
          (destination) => destination.columnId,
          mapFrom((source) => source.columnId)
        )
        .forMember(
          (destination) => destination.title,
          mapFrom((source) => source.title)
        )
        .forMember(
          (destination) => destination.order,
          mapFrom((source) => source.order)
        )
        .forMember(
          (destination) => destination.description,
          mapFrom((source) => source.description)
        );

      this.mapper.createMap(TaskDto, TaskEntity)
        .forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id)
        )
        .forMember(
          (destination) => destination.boardId,
          mapFrom((source) => source.boardId)
        )
        .forMember(
          (destination) => destination.userId,
          mapFrom((source) => source.userId)
        )
        .forMember(
          (destination) => destination.columnId,
          mapFrom((source) => source.columnId)
        )
        .forMember(
          (destination) => destination.title,
          mapFrom((source) => source.title)
        )
        .forMember(
          (destination) => destination.order,
          mapFrom((source) => source.order)
        )
        .forMember(
          (destination) => destination.description,
          mapFrom((source) => source.description)
        );
    };
  }
}