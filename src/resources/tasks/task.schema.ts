import { EntitySchema } from 'typeorm';
import { TaskModel } from '../../types';
import BaseSchema from "../../common/base-schema";

/**
 * @deprecated Don't use 
 */
const TaskEntity = new EntitySchema<TaskModel>({
  name: 'task',
  tableName: 'tasks',
  columns: {
    ...BaseSchema,

    boardId: {
      name: 'board_id',
      type: 'uuid',
    },
    userId: {
      name: 'user_id',
      type: 'uuid',
      nullable: true
    },
    columnId: {
      name: 'column_id',
      type: 'uuid',
      nullable: true
    },
    order: {
      name: 'order',
      type: 'integer',
      nullable: true
    },
    title: {
      name: 'title',
      type: 'text',
    },
    description: {
      name: 'description',
      type: 'text',
      nullable: true
    },
  },
  relations: {
    board: {
      type: "many-to-one",
      target: "board",
      inverseSide: "tasks",
      joinColumn: true,
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    user: {
      type: "many-to-one",
      target: "user",
      inverseSide: "tasks",
      joinColumn: {
        name: "userId",
      },
      onDelete: "CASCADE",
      onUpdate: 'CASCADE',
      nullable: true,
      orphanedRowAction: "nullify"
    },
    column: {
      type: "many-to-one",
      target: "column",
      inverseSide: "tasks",
      joinColumn: {
        name: "columnId"
      },
      onDelete: "CASCADE",
      onUpdate: 'CASCADE',
      nullable: true
    }
  }
});

export default TaskEntity;