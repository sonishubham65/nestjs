import {MigrationInterface, QueryRunner} from "typeorm";

export class first1620918217081 implements MigrationInterface {
    name = 'first1620918217081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user_entity"."dob" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "dob" SET DEFAULT '1950-01-01T00:00:00.000+00:00'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "dob" SET DEFAULT '1950-01-01 00:00:00+00'`);
        await queryRunner.query(`COMMENT ON COLUMN "user_entity"."dob" IS NULL`);
    }

}
