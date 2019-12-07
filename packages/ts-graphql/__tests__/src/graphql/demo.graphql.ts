import { Query } from '@nestjs/graphql';
import { Controller } from '@nestjs/common';
interface Base { 
    title: string;
}
interface Demo3 extends Base {
    username: string;
}
interface Demo2<Entity = any> {
    instance: Entity;
}
@Controller()
export class DemoGraphql {
    @Query()
    async getDemo2(): Promise<Demo2<Demo3[]>> {
        return {} as any;
    }
    @Query()
    async getDemo1(): Promise<Demo2<Demo3>> {
        return {} as any;
    }
    @Query()
    async getDemo(): Promise<Demo2<Demo2<Demo3>[]>[]> {
        return {} as any;
    }
}
