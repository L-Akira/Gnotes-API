import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export class AlterRootFolder1615928309102 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('root_folders',[
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
