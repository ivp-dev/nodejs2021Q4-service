
import { EntitySchema } from "typeorm";
import { ColumnModel } from "../../types";

export const ColumnEntity = new EntitySchema<ColumnModel>({
  name: "column",
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: true
    },
    title: {
      type: String,
      name: 'title',
    },
    order: {
      type: Number,
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

export default ColumnEntity;