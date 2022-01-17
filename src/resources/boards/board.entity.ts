import { Column, Entity, OneToMany } from 'typeorm';
import type ColumnEntity from '../columns/column.entity';
import BaseEntity from '../../common/base-entity';
import type TaskEntity from '../tasks/task.entity';

@Entity({ name: 'boards' })
class BoardEntity extends BaseEntity {
  @Column({ type: 'text' })
  title?: string

  @OneToMany('columns', 'board', {
    cascade: true
  })
  columns?: ColumnEntity[]

  @OneToMany('tasks', 'board', {
    cascade: true
  })
  tasks?: TaskEntity[]
}

export default BoardEntity;