import { PrimaryColumn, Column, ManyToOne } from '@nger/typeorm'
export class User {
    @PrimaryColumn()
    username: string;

    @Column()
    id: string;

    @Column({
        unique: true
    })
    code: string;

    @ManyToOne(() => UserGroup)
    group: UserGroup;
}

export class UserGroup { 
    @PrimaryColumn()
    code: string;

    title: string;
}