import { MigrationInterface, QueryRunner } from 'typeorm';

export class Links1653550822060 implements MigrationInterface {
  name = 'Links1653550822060';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "short_link" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "short" character varying NOT NULL,
                "link" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "user_id" uuid,
                CONSTRAINT "UQ_0b491ef577618015d7440ed47b1" UNIQUE ("short"),
                CONSTRAINT "PK_7908299b513d8842d9f473a2f49" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "short_link"
            ADD CONSTRAINT "FK_113125abd8c64f7c3eab2a2ea97" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "short_link" DROP CONSTRAINT "FK_113125abd8c64f7c3eab2a2ea97"
        `);
    await queryRunner.query(`
            DROP TABLE "short_link"
        `);
  }
}
