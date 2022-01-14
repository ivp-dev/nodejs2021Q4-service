import { EntitySchema } from 'typeorm';
import { TaskModel } from '../../types';
import baseEntity from "../../common/base-entity";

export const TaskEntity = new EntitySchema<TaskModel>({
  name: 'task',
  tableName: 'tasks',
  columns: {
    ...baseEntity,

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
      joinColumn: {
        name: 'boardId',
      },
      onDelete: 'CASCADE'
    },
    user: {
      type: "many-to-one",
      target: "user",
      inverseSide: "tasks",
      joinColumn: {
        name: "userId",
      },
      onDelete: "CASCADE",
      nullable: true
    },
    column: {
      type: "many-to-one",
      target: "column",
      inverseSide: "tasks",
      joinColumn: {
        name: "columnId"
      },
      onDelete: "CASCADE",
      nullable: true
    }
  }
});