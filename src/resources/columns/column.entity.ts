import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import type BoardEntity from '../boards/board.entity';
import type TaskEntity from "../tasks/task.entity";
import BaseEntity from "../../common/base-entity";

@Entity({ name: 'columns' })
class ColumnEntity extends BaseEntity {
  @Column({
    type: 'text'
  })
  title?: string

  @Column({
    type: 'integer',
    nullable: true
  })
  order?: number

  @Column({
    type: 'text',
    nullable: false
  })
  boardId?: string;

  @ManyToOne('boards', 'columns', {
    onDelete: 'CASCADE'
  })
  board?: BoardEntity

  @OneToMany('tasks', 'column')
  tasks?: TaskEntity[]
}



export default ColumnEntity;