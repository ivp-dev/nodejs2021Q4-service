import { Column, Entity, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import ColumnEntity from './column.entity';
import { BaseEntity } from '../../common/base-entity';
import type TaskEntity from './task.entity';


@Entity({ name: 'boards' })
class BoardEntity extends BaseEntity {
  @AutoMap()
  @Column({ type: 'text' })
  title?: string;

  @AutoMap({ typeFn: () => ColumnEntity })
  @OneToMany('columns', 'board', {
    cascade: true,
  })
  columns?: ColumnEntity[];

  @OneToMany('tasks', 'board', {
    cascade: true,
  })
  tasks?: TaskEntity[];
}

export default BoardEntity;
