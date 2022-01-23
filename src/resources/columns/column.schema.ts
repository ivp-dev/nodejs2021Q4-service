import { EntitySchema } from "typeorm";
import { ColumnModel } from "../../types";
import BaseSchame from '../../common/base-schema';

/**
 * @deprecated Instead of use ColumnEntity  
 */
const columnEntity = new EntitySchema<ColumnModel>({
  name: "column",
  tableName: 'columns',
  columns: {
    ...BaseSchame,

    title: {
      type: 'text',
      name: 'title',
    },
    order: {
      type: 'integer',
      name: 'order',
      nullable: true
    }
  },
  relations: {
    board: {
      type: "many-to-one",
      target: "board",
      inverseSide: "columns",
      joinTable: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete'
    },
    tasks: {
      type: "one-to-many",
      target: "task",
      inverseSide: "columns",
      cascade: true
    }
  }
});

export default columnEntity;