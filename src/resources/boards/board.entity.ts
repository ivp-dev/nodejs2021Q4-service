import { EntitySchema } from "typeorm";
import { BoardModel } from "../../types";

const boardEntity = new EntitySchema<BoardModel>({
  name: "board",
  columns: {
    id: {
      type: 'uuid',
      name: 'id',
      primary: true,
      generated: true
    },
    title: {
      type: 'string'
    }
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