import { EntitySchema } from "typeorm";
import { UserModel } from "../../types"
import baseEntity from "../../common/base-entity";

export const userEntity = new EntitySchema<UserModel>({
  name: 'user',
  tableName: 'users',
  columns: {
    ...baseEntity,

    name: {
      name: 'name',
      type: 'text'
    },
    login: {
      name: 'login',
      type: 'text'
    },
    password: {
      name: 'password',
      type: 'text'
    },
  },
  relations: {
    tasks: {
      type: "one-to-many",
      target: "task",
      inverseSide: "user",
      cascade: ["remove"],
    }
  }
});