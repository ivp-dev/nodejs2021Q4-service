import { EntitySchema } from 'typeorm';
import { TaskModel } from '../../types';
import baseEntity from "../base-entity";

const taskEntity = new EntitySchema<TaskModel>({
  name: 'task',
  columns: {
    ...baseEntity,

    boardId: {
      name: 'board_id',
      type: 'string',
    },
    userId: {
      name: 'user_id',
      type: 'string',
    },
    columnId: {
      name: 'column_id',
      type: 'string',
    },
    title: {
      name: 'title',
      type: 'string',
    },
    description: {
      name: 'description',
      type: 'string'
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
})

export default taskEntity;