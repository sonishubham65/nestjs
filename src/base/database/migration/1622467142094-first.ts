import {MigrationInterface, QueryRunner} from "typeorm";

export class first1622467142094 implements MigrationInterface {
    name = 'first1622467142094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "role" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_7bc1bd2364b6e9bf7c84b1e52e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "dob" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '1950-01-01 00:00:00+00', "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_415c35b9b3b6fe45a3b065030f" ON "user_entity" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_231e71f7ea9694409d6d61810d" ON "user_entity" ("first_name", "last_name") `);
        await queryRunner.query(`CREATE TABLE "property_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "version" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "short_description" character varying NOT NULL, "long_description" character varying NOT NULL, "sqft" integer NOT NULL, "facing" character varying NOT NULL DEFAULT 'east', "address" character varying NOT NULL, "type" "property_entity_type_enum" NOT NULL DEFAULT 'house-villa', "cover" character varying(300), "userId" uuid, CONSTRAINT "PK_6bc642effd84808c1ee1e73bc1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "role_entity" ADD CONSTRAINT "FK_6b7dbf5da4f72695f2585774f43" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "property_entity" ADD CONSTRAINT "FK_dd11b8a8ba4fc9d896975e04f30" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property_entity" DROP CONSTRAINT "FK_dd11b8a8ba4fc9d896975e04f30"`);
        await queryRunner.query(`ALTER TABLE "role_entity" DROP CONSTRAINT "FK_6b7dbf5da4f72695f2585774f43"`);
        await queryRunner.query(`DROP TABLE "property_entity"`);
        await queryRunner.query(`DROP INDEX "IDX_231e71f7ea9694409d6d61810d"`);
        await queryRunner.query(`DROP INDEX "IDX_415c35b9b3b6fe45a3b065030f"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "role_entity"`);
    }

}
