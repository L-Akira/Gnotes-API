import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterColumnPasswordUsers1615234400095 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users 
        ALTER COLUMN password TYPE VARCHAR(148);`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users 
        ALTER COLUMN password TYPE VARCHAR(44);`)
    }

}
