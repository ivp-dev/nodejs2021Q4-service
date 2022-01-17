import { Column, Entity, ManyToOne } from 'typeorm';
import type BoardEntity from '../boards/board.entity';
import type ColumnEntity from '../columns/column.entity';
import type UserEntity from '../users/user.entity';
import BaseEntity from '../../common/base-entity';

@Entity({ name: 'tasks' })
class TaskEntity extends BaseEntity {
  @Column({ type: 'integer' })
  order?: number

  @Column({ type: 'text' })
  title?: string

  @Column({ type: 'text' })
  description?: string

  @Column({ type: 'text', nullable: false })
  boardId?: string;

  @Column({ type: 'text', nullable: true })
  userId?: string;

  @Column({ type: 'text', nullable: true })
  columnId?: string

  @ManyToOne('boards', 'tasks', {
    onDelete: 'CASCADE'
  })
  board?: BoardEntity

  @ManyToOne('columns', 'tasks')
  column?: ColumnEntity

  @ManyToOne('users', 'tasks', {
    onDelete: 'SET NULL',
  })
  user?: UserEntity
}

export default TaskEntity;