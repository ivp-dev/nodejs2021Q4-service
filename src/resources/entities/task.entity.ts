import { Column, Entity, ManyToOne } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import type BoardEntity from './board.entity';
import type ColumnEntity from './column.entity';
import type UserEntity from './user.entity';
import { BaseEntity } from '../../common/base-entity';

@Entity({ name: 'tasks' })
class TaskEntity extends BaseEntity {
  @AutoMap()
  @Column({ type: 'integer' })
  order?: number;

  @AutoMap()
  @Column({ type: 'text' })
  title?: string;

  @AutoMap()
  @Column({ type: 'text' })
  description?: string;

  @AutoMap()
  @Column({ type: 'text', nullable: false })
  boardId?: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  userId?: string;

  @AutoMap()
  @Column({ type: 'text', nullable: true })
  columnId?: string;

  @ManyToOne('boards', 'tasks', {
    onDelete: 'CASCADE',
  })
  board?: BoardEntity;

  @ManyToOne('columns', 'tasks')
  column?: ColumnEntity;

  @ManyToOne('users', 'tasks', {
    onDelete: 'SET NULL',
  })
  user?: UserEntity;
}

export default TaskEntity;
