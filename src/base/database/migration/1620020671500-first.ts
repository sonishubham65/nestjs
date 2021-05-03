import {MigrationInterface, QueryRunner} from "typeorm";

export class first1620020671500 implements MigrationInterface {
    name = 'first1620020671500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "property_entity" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property_entity" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "deletedAt"`);
    }

}
