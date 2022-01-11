
import { EntitySchema } from "typeorm";
import { ColumnModel } from "../../types";

export const columnEntity = new EntitySchema<ColumnModel>({
  name: "column",
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: true
    },
    title: {
      type: 'string',
      name: 'title',
    },
    order: {
      type: 'number',
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