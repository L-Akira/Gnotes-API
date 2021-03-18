import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import RootFolder from './Root-Folder';



@Entity('users')
export default class User {
    
    @PrimaryColumn('uuid')
    readonly id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    username: string;

    @Column('varchar')
    @Exclude()
    password: string;

    @Column('varchar')
    email: string;

    @Column('smallint')
    files_quantity: number;

    @Column('smallint')
    folders_quantity: number;

    @OneToOne(type => RootFolder, user => User, { eager: true })
    @JoinColumn({name: 'id', referencedColumnName: 'user_id'})
    rootFolder: RootFolder;

    @CreateDateColumn()
    @Exclude()
    created_at: Date;

    @UpdateDateColumn()
    @Exclude()
    updated_at: Date;
    
}