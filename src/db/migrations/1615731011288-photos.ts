import { MigrationInterface, QueryRunner } from 'typeorm';

export class photos1615731011288 implements MigrationInterface {
  name = 'photos1615731011288';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "photo" ("id" SERIAL NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "src" character varying, "url" character varying(300) NOT NULL, "isPrivate" boolean NOT NULL, "userId" integer NOT NULL, CONSTRAINT "UQ_8629fb486b40a0a57f8f27abfba" UNIQUE ("src"), CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
    await queryRunner.query(`DROP TABLE "photo"`);
  }
}
