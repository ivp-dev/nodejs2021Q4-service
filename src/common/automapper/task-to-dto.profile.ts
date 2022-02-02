import {
  mapFrom,
  MappingProfile,
} from '@automapper/core';
import { TaskDto } from '../dto';
import { TaskEntity } from '../../resources/entities';

export const taskToDtoProfile: MappingProfile = (mapper) => {
  mapper
    .createMap(TaskEntity, TaskDto)
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
