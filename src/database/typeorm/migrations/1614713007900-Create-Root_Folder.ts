import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateRootFolder1614713007900 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'root_folders',
            columns:[
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                },
                {
                    name: 'files_quantity',
                    type: 'smallint',
                },
                {
                    name: 'folders_quantity',
                    type: 'smallint',
                },
            ],
            foreignKeys: [
                {
                    name: 'FKuser',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    columnNames: ['user_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('root_folders');
    }

}
