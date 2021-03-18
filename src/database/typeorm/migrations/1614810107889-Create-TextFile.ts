import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTextFile1614810107889 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'text_files',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'folder_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'root_folder_id',
                    type: 'uuid',
                },
                {
                    name: 'owner_id',
                    type: 'uuid',
                },
                {
                    name: 'title',
                    type: 'varchar(30)'
                },
                {
                    name: 'content',
                    type: 'varchar(200)'
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                },
            ],
            foreignKeys: [
                {
                    name: 'FKuser',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    columnNames: ['owner_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                {
                    name: 'FKfolder',
                    referencedTableName: 'folders',
                    referencedColumnNames: ['id'],
                    columnNames: ['folder_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                {
                    name: 'FKfolderRoot',
                    referencedTableName: 'root_folders',
                    referencedColumnNames: ['id'],
                    columnNames: ['root_folder_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('text_files');
    }

}
