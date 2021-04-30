import {MigrationInterface, QueryRunner} from "typeorm";

export class first1619361764903 implements MigrationInterface {
    name = 'first1619361764903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "property_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "short_description" character varying NOT NULL, "long_description" character varying NOT NULL, "sqft" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_6bc642effd84808c1ee1e73bc1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "property_entity" ADD CONSTRAINT "FK_dd11b8a8ba4fc9d896975e04f30" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property_entity" DROP CONSTRAINT "FK_dd11b8a8ba4fc9d896975e04f30"`);
        await queryRunner.query(`DROP TABLE "property_entity"`);
    }

}
