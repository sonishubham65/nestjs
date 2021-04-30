import {MigrationInterface, QueryRunner} from "typeorm";

export class first1619361870502 implements MigrationInterface {
    name = 'first1619361870502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property_entity" ADD "address" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property_entity" DROP COLUMN "address"`);
    }

}
