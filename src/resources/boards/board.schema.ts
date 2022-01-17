import { EntitySchema } from "typeorm";
import BaseSchame from '../../common/base-schema';
import { BoardModel } from '../../types';

/**
 * @deprecated Don't use
 */
 const BoardSchema = new EntitySchema<BoardModel>({
  name: 'board',
  tableName: 'boards',
  columns: {
    ...BaseSchame,

    title: {
      type: 'text',
      name: 'title',
    },
  },
  relations: {
    columns: {
      type: 'one-to-many',
      target: 'column',
      inverseSide: 'board',
      joinColumn: true,
      cascade: true,
      orphanedRowAction: 'delete'
    },
    tasks: {
      type: 'one-to-many',
      target: 'task',
      inverseSide: 'board',
    }
  }
});

export default BoardSchema;