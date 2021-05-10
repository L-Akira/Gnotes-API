import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class RenoveNameFromUser1619818847889 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'name');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn(
            {
                name: 'name',
                type: 'varchar(120)',
            }
        ));
    }

}
