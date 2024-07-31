import { MigrationInterface, QueryRunner } from 'typeorm';

export class TablesSetup1722372435215 implements MigrationInterface {
  name = 'TablesSetup1722372435215';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "house" ("name" character varying NOT NULL, "motto" character varying NOT NULL, "head_of_house" character varying NOT NULL, "bravery" boolean NOT NULL DEFAULT false, "loyalty" boolean NOT NULL DEFAULT false, "intelligence" boolean NOT NULL DEFAULT false, "ambition" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_f581d5b78b4e344a1a75f2ceb4b" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "student" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "age" integer NOT NULL, "bravery" integer NOT NULL, "loyalty" integer NOT NULL, "intelligence" integer NOT NULL, "ambition" integer NOT NULL, "house_name" character varying, CONSTRAINT "UQ_eead2cd6e5be2c86303b786bff9" UNIQUE ("name"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ADD CONSTRAINT "FK_2ec9d512ffcbba526478a2b6f5b" FOREIGN KEY ("house_name") REFERENCES "house"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student" DROP CONSTRAINT "FK_2ec9d512ffcbba526478a2b6f5b"`,
    );
    await queryRunner.query(`DROP TABLE "student"`);
    await queryRunner.query(`DROP TABLE "house"`);
  }
}
