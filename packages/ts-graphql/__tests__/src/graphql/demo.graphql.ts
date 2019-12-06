import { Query, Mutation, Subscription } from '@nestjs/graphql';
import { Controller } from '@nestjs/common';
export interface Demo10 {
    title: string;
}
export interface Demo0 {
    /**
     * demo0 desc
     */
    desc: string;
}

export interface Demo2 extends Demo0 {
    /**
     * demo2 title
     */
    title: string;
}
export interface Demo3 extends Demo2 {
    /**
     * demo3 title
     */
    title: string;
    demo2: Demo2;
}

export enum DemoEnum {
    Demo4 = 1,
    Demo5 = 2
}

@Controller()
export class DemoGraphql implements Demo3 {
    /**
     * title
     * @return Number
     */
    title: string;

    demo2: Demo2;
    /**
     * desc
     */
    desc: string;
    /**
     * get demo
     * @return {Number}
     */
    @Query()
    async getDemo(input: string): Promise<Demo3[]> {
        return [{
            title: 'title',
            desc: `desc`,
            demo2: {
                desc: ``,
                title: ``
            }
        }]
    }

    /**
     * get demo2 
     * @param {String} title  返回值
     * @return {String}
     */
    @Mutation()
    async getDemo2(title: Demo2): Promise<Demo3> {
        return {} as any
    }

    /**
     * get demo3
     * @return {Demo0}
     */
    @Subscription()
    getDemo3(): AsyncIterator<any> {
        return {} as any;
    }
}