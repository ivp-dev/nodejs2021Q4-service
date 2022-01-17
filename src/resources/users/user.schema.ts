import { EntitySchema } from "typeorm";
import { UserModel } from "../../types"
import BaseSchema from "../../common/base-schema";

const UserEntity = new EntitySchema<UserModel>({
  name: 'user',
  tableName: 'users',
  columns: {
    ...BaseSchema,

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
      cascade: true,
      orphanedRowAction: "nullify"
    }
  }
});

export default UserEntity;