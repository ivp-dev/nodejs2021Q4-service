import { MigrationInterface, QueryRunner } from 'typeorm';
import { admin } from '../seeds/user.seed';

export class seed1642960158780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users (name, password, login) VALUES ('${admin.name}', '${admin.password}', '${admin.login}')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
