import {MigrationInterface, QueryRunner} from "typeorm";

export class first1621742941606 implements MigrationInterface {
    name = 'first1621742941606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property_entity" ADD "cover" character varying(300)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property_entity" DROP COLUMN "cover"`);
    }

}
