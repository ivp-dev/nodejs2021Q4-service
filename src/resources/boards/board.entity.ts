import { EntitySchema } from "typeorm";
import { BoardModel } from "../../types";
import baseEntity from "../../common/base-entity";

export const BoardEntity = new EntitySchema<BoardModel>({
  name: "board",
  tableName: 'boards',
  columns: {
    ...baseEntity,

    title: {
      type: 'text',
      name: 'title',
    },
  },
  relations: {
    columns: {
      type: "one-to-many",
      target: "column",
      inverseSide: "board",
      joinColumn: true,
      cascade: true,
      orphanedRowAction: 'delete'
    },
    tasks: {
      type: "one-to-many",
      target: "task",
      inverseSide: "board",
    }
  }
});