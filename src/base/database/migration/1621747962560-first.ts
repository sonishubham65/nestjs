import {MigrationInterface, QueryRunner} from "typeorm";

export class first1621747962560 implements MigrationInterface {
    name = 'first1621747962560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "role" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_7bc1bd2364b6e9bf7c84b1e52e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "role_entity" ADD CONSTRAINT "FK_6b7dbf5da4f72695f2585774f43" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_entity" DROP CONSTRAINT "FK_6b7dbf5da4f72695f2585774f43"`);
        await queryRunner.query(`DROP TABLE "role_entity"`);
    }

}
