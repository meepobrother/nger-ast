import { Entity, Column, PrimaryColumn } from 'typeorm';
/**
 * 用户
 */
@Entity()
export class User {
    /**
     * 用户uid
     */
    @PrimaryColumn()
    uid: string;
    /**
     * 用户名
     */
    @Column()
    username: string;
    /**
     * 密码
     */
    @Column()
    password: string;
}