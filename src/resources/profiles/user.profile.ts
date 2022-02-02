import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities';
import { UserDto } from '../dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return () => {
      this.mapper.createMap(UserEntity, UserDto)
        .forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id)
        )
        .forMember(
          (destination) => destination.login,
          mapFrom((source) => source.login)
        )
        .forMember(
          (destination) => destination.name,
          mapFrom((source) => source.name)
        );

      this.mapper.createMap(UserDto, UserEntity)
        .forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id)
        )
        .forMember(
          (destination) => destination.login,
          mapFrom((source) => source.login)
        )
        .forMember(
          (destination) => destination.name,
          mapFrom((source) => source.name)
        )
        .forMember(
          (destination) => destination.password,
          mapFrom((source) => source.password)
        );
    };
  }
}