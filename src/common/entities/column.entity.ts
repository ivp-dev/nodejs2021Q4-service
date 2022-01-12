
import { EntitySchema } from "typeorm";
import { ColumnModel } from "../../types";
import BaseEntity from "../base-entity";

export const columnEntity = new EntitySchema<ColumnModel>({
  name: "column",
  columns: {
    ...BaseEntity,

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