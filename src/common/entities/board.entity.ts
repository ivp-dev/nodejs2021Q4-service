import { EntitySchema } from "typeorm";
import { BoardModel } from "../../types";
import baseEntity from "../base-entity";

const boardEntity = new EntitySchema<BoardModel>({
  name: "board",
  columns: {
    ...baseEntity,

    title: {
      type: 'string',
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