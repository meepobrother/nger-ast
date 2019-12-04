import { Query, Mutation, Subscription, Scalar } from '@nestjs/graphql';
import { Controller } from '@nestjs/common';
export function Demo(name: string): PropertyDecorator {
    return (target, property) => {

    }
}
export interface Demo0 {
    desc: string;
}
export interface Demo2 {
    /**
     * demo2 title
     */
    title: string;
}
export interface Demo3 {
    /**
     * demo3 title
     */
    title: string;
}
export type Demo = Demo2 | Demo3 | DemoEnum;

export enum DemoEnum {
    Demo = 1,
    Demo2 = 2
}

@Scalar(`Date`)
export class Date { }

@Controller()
export class DemoGraphql implements Demo3 {
    /**
     * title
     * @return Number
     */
    @Demo(`title`)
    title: string;
    /**
     * get demo
     * @return {Number}
     */
    @Query({ demo: "demo2" })
    async getDemo(): Promise<string> {
        return `string`
    }

    /**
     * get demo2 
     * @param {String} title  返回值
     * @return {String}
     */
    @Mutation(`demo`)
    async getDemo2(title: string): Promise<string> {
        return `demo2`
    }

    /**
     * get demo3
     * @return {Demo0}
     */
    @Subscription(`demo2`)
    getDemo3(): AsyncIterator<any> {
        return {} as any;
    }
}