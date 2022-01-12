import { ConnectionOptions } from "typeorm";
import * as path from "path";
import * as dotenv from 'dotenv'

console.log(path.resolve(path.resolve(__dirname, '../**/*.entity{.ts}}')))

const result = dotenv.config({ path: path.resolve(__dirname, './../../.env.orm') });

if (result.error) {
  throw result.error
}

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT ?? 5432),
  migrationsTableName: process.env.MIGRATIONS_TABLE_NAME ?? "__MigrationsHistory",
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [path.resolve(__dirname, './../../src/common/entities/*.ts')],
  migrations: [path.resolve(__dirname, './../../migrations/')],
  cli: {
    migrationsDir: path.resolve(__dirname, './../../migrations/'),
  }
}

export default config;