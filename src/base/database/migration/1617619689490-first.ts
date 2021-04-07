import {MigrationInterface, QueryRunner} from "typeorm";

export class first1617619689490 implements MigrationInterface {
    name = 'first1617619689490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_415c35b9b3b6fe45a3b065030f" ON "user_entity" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_231e71f7ea9694409d6d61810d" ON "user_entity" ("first_name", "last_name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_231e71f7ea9694409d6d61810d"`);
        await queryRunner.query(`DROP INDEX "IDX_415c35b9b3b6fe45a3b065030f"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
