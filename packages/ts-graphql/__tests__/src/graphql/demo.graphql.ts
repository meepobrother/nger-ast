import { Query, Mutation, Subscription, Scalar } from '@nestjs/graphql';
import { Controller } from '@nestjs/common';
import * as fs from 'fs';
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
    /**
     * desc
     */
    desc: string;
    /**
     * get demo
     * @return {Number}
     */
    @Query()
    async getDemo(input: string): Promise<Demo3> {
        fs.writeFileSync(``, ``)
        return `string` as any
    }

    /**
     * get demo2 
     * @param {String} title  返回值
     * @return {String}
     */
    @Mutation(`demo`)
    async getDemo2(title: Demo2): Promise<Demo3> {
        return `demo2` as any
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