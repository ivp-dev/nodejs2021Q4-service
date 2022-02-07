import { MigrationInterface, QueryRunner } from 'typeorm';
import bcrypt from 'bcrypt';
import { admin } from '../seeds/user.seed';

export class seed1642960158780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const salt = await bcrypt.genSalt(
      process.env.SALT_ROUNDS ? +process.env.SALT_ROUNDS : 10
    );
    const hashPassword = await bcrypt.hash(admin.password, salt);

    await queryRunner.query(
      `INSERT INTO users (name, password, login) VALUES ('${admin.name}', '${hashPassword}', '${admin.login}')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
