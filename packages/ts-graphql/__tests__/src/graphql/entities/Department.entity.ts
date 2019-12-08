import { Entity, Column, PrimaryColumn } from 'typeorm';
/**
 * 部门
 */
@Entity()
export class Department {
    /**
     * 部门id
     */
    @PrimaryColumn()
    id: string;
    /**
     * 部门名称
     */
    @Column()
    title: string;
}