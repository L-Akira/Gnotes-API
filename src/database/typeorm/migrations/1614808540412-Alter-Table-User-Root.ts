import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterTableUserRoot1614808540412 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('users',[
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()'
            }),
            new TableColumn({
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('users',[
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()'
            }),
            new TableColumn({
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
            }),
        ])
    }

}
