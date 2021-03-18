import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { User } from '@models/index';
import { Exclude } from 'class-transformer';

@Entity('root_folders')
export default class RootFolder {

    @PrimaryColumn('uuid')
    readonly id: string;

    @Column('uuid')
    user_id: string;

    @OneToOne(type => User, rootFolder => RootFolder)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;

    @Column('smallint')
    files_quantity: number;

    @Column('smallint')
    folders_quantity: number;

    @CreateDateColumn()
    @Exclude()
    created_at: Date;

    @UpdateDateColumn()
    @Exclude()
    updated_at: Date;

}