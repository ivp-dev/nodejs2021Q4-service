import { EntitySchema } from "typeorm";
import { BoardModel } from "../../types";
import baseEntity from "../../common/base-entity";

const boardEntity = new EntitySchema<BoardModel>({
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
      cascade: ["remove"],
    }
  }
});

export default boardEntity