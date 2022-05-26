import { MigrationInterface, QueryRunner } from 'typeorm';

export class LinksVisit1653556207821 implements MigrationInterface {
  name = 'LinksVisit1653556207821';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "short_link_visit" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "ip" inet NOT NULL,
                "visit_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "link_id" uuid,
                CONSTRAINT "PK_d5906a674ed575c19d04d889567" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "short_link_visit"
            ADD CONSTRAINT "FK_4146bdfbffd2211102aab27c17f" FOREIGN KEY ("link_id") REFERENCES "short_link"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "short_link_visit" DROP CONSTRAINT "FK_4146bdfbffd2211102aab27c17f"
        `);
    await queryRunner.query(`
            DROP TABLE "short_link_visit"
        `);
  }
}
