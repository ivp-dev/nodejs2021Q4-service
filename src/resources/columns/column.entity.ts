
import { EntitySchema } from "typeorm";
import { ColumnModel } from "../../types";
import BaseEntity from "../../common/base-entity";

export const columnEntity = new EntitySchema<ColumnModel>({
  name: "column",
  tableName: 'columns',
  columns: {
    ...BaseEntity,

    title: {
      type: 'text',
      name: 'title',
    },
    order: {
      type: 'integer',
      name: 'order',
    }
  },
  relations: {
    board: {
      type: "many-to-one",
      target: "board",
      inverseSide: "columns",
      joinColumn: {
        name: 'boardId',
      },
    }
  }
});

export default columnEntity;