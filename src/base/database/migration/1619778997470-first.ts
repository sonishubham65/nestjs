import {MigrationInterface, QueryRunner} from "typeorm";

export class first1619778997470 implements MigrationInterface {
    name = 'first1619778997470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property_entity" ADD "type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property_entity" DROP COLUMN "type"`);
    }

}
