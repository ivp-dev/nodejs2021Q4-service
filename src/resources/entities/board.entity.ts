import { Column, Entity, OneToMany } from 'typeorm';
import type ColumnEntity from './column.entity';
import BaseEntity from '../../common/base-entity';
import type TaskEntity from './task.entity';

@Entity({ name: 'boards' })
class BoardEntity extends BaseEntity {
  @Column({ type: 'text' })
  title?: string;

  @OneToMany(/* target */ 'columns', /* inverseSide */ 'board', {
    cascade: true,
  })
  columns?: ColumnEntity[];

  @OneToMany(/* target */ 'tasks', /* inverseSide */ 'board', {
    cascade: true,
  })
  tasks?: TaskEntity[];
}

export default BoardEntity;
