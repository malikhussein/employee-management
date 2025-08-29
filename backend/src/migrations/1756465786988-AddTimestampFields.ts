import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTimestampFields1756465786988 implements MigrationInterface {
    name = 'AddTimestampFields1756465786988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "department" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "department" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "department" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "createdAt"`);
    }

}
