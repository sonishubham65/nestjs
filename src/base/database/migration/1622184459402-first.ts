import {MigrationInterface, QueryRunner} from "typeorm";

export class first1622184459402 implements MigrationInterface {
    name = 'first1622184459402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property_entity" ADD "facing" character varying NOT NULL DEFAULT 'east'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property_entity" DROP COLUMN "facing"`);
    }

}
