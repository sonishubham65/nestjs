import {MigrationInterface, QueryRunner} from "typeorm";

export class first1619779154500 implements MigrationInterface {
    name = 'first1619779154500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property_entity" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "property_entity_type_enum" AS ENUM('flat', 'house-villa', 'plot', '1 bhk', '2 bhk', '3 bhk', '4 bhk', '4+bhk')`);
        await queryRunner.query(`ALTER TABLE "property_entity" ADD "type" "property_entity_type_enum" NOT NULL DEFAULT 'house-villa'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property_entity" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "property_entity_type_enum"`);
        await queryRunner.query(`ALTER TABLE "property_entity" ADD "type" character varying NOT NULL`);
    }

}
