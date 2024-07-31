import { MigrationInterface, QueryRunner } from 'typeorm';
import { houses } from 'src/fixture/houses';
import { House } from 'src/houses/entities/house.entity';

export class Fixture1722372479985 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(House, houses);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
