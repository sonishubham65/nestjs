import {MigrationInterface, QueryRunner} from "typeorm";

export class first1620022306303 implements MigrationInterface {
    name = 'first1620022306303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property_entity" DROP CONSTRAINT "FK_dd11b8a8ba4fc9d896975e04f30"`);
        await queryRunner.query(`ALTER TABLE "property_entity" ADD CONSTRAINT "FK_dd11b8a8ba4fc9d896975e04f30" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property_entity" DROP CONSTRAINT "FK_dd11b8a8ba4fc9d896975e04f30"`);
        await queryRunner.query(`ALTER TABLE "property_entity" ADD CONSTRAINT "FK_dd11b8a8ba4fc9d896975e04f30" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
