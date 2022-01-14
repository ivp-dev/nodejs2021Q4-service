import {MigrationInterface, QueryRunner} from "typeorm";

export class userNullable1642171662104 implements MigrationInterface {
    name = 'userNullable1642171662104'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "user_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "user_id" SET NOT NULL`);
    }

}
