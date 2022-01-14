import {MigrationInterface, QueryRunner} from "typeorm";

export class taskColumnNullable21642172202255 implements MigrationInterface {
    name = 'taskColumnNullable21642172202255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "column_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "column_id" SET NOT NULL`);
    }

}
