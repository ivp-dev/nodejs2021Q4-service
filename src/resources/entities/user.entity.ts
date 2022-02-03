import { Column, Entity, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '../../common/base-entity';
import type TaskEntity from './task.entity';


@Entity({ name: 'users' })
class UserEntity extends BaseEntity {
  @AutoMap()
  @Column({ type: 'text' })
  name?: string;

  @AutoMap()
  @Column({ type: 'text' })
  login?: string;

  @Column({ type: 'text' })
  password?: string;

  @OneToMany('tasks', 'user', {
    cascade: true,
  })
  tasks?: TaskEntity[];
}

export default UserEntity;
