import { EntitySchema } from "typeorm";
import { UserModel } from "../../types"
import baseEntity from "../base-entity";

const userEntity = new EntitySchema<UserModel>({
  name: 'user',
  columns: {
    ...baseEntity,

    name: {
      name: 'name',
      type: 'string'
    },
    login: {
      name: 'login',
      type: 'string'
    },
    password: {
      name: 'password',
      type: 'string'
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

export default userEntity;