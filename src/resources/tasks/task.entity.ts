import { EntitySchema } from 'typeorm';
import { TaskModel } from '../../types';
import baseEntity from "../../common/base-entity";

export const taskEntity = new EntitySchema<TaskModel>({
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
    },
    columnId: {
      name: 'column_id',
      type: 'uuid',
    },
    title: {
      name: 'title',
      type: 'text',
    },
    description: {
      name: 'description',
      type: 'text'
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
    },
    user: {
      type: "many-to-one",
      target: "user",
      inverseSide: "tasks",
      joinColumn: {
        name: 'userId',
      },
    }
  }
});