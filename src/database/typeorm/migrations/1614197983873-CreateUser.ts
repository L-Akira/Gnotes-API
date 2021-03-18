import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUser1614197983873 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
        name: 'users',
        columns: [
            {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
            },
            {
                name: 'name',
                type: 'varchar(120)',
            },
            {
                name: 'username',
                type: 'varchar(70)',
            },
            {
                name: 'password',
                type: 'varchar(44)',
            },
            {
                name: 'email',
                type: 'varchar(80)',
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
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
