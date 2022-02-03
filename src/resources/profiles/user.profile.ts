import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { mapFrom, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities';
import { BaseEntity } from '../../common/base-entity';
import { BaseDto } from '../dto/base.dto';
import { UserDto } from '../dto/user.dto';
import { UserCreateDto } from '../dto/user-create.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return () => {
      this.mapper.createMap(UserEntity, UserDto, {
        extends: [this.mapper.getMapping(BaseEntity, BaseDto)],
      });

      this.mapper.createMap(UserDto, UserEntity, {
        extends: [this.mapper.getMapping(BaseEntity, BaseDto)],
      });

      this.mapper
        .createMap(UserEntity, UserCreateDto, {
          extends: [this.mapper.getMapping(UserEntity, UserDto)],
        })
        .forMember(
          (destination) => destination.password,
          mapFrom((source) => source.password)
        );

      this.mapper
        .createMap(UserCreateDto, UserEntity, {
          extends: [this.mapper.getMapping(UserEntity, UserCreateDto)],
        })
        .forMember(
          (destination) => destination.password,
          mapFrom((source) => source.password)
        );
    };
  }
}
