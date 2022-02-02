import { Column, Entity, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import type TaskEntity from './task.entity';
import BaseEntity from '../../common/base-entity';

@Entity({ name: 'users' })
class UserEntity extends BaseEntity {
  @Column({ type: 'text' })
  name?: string;

  @Column({ type: 'text' })
  login?: string;

  @Exclude()
  @Column({ type: 'text' })
  password?: string;

  @OneToMany('tasks', 'user', {
    cascade: true,
  })
  tasks?: TaskEntity[];
}

export default UserEntity;
