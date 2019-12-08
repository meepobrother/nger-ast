import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Float, Int32 } from '@nger/ast.core';
/**
 * 部门
 */
@Entity()
export class Department {
    /**
     * 部门id
     */
    @PrimaryColumn()
    id: Float;
    @Column()
    int32: Int32;

    @Column()
    isAdmin: boolean;
    /**
     * 部门名称
     */
    @Column()
    title: string;
}