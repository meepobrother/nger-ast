import { Demo2 as DDDDemo2, Demo4 } from './demo2';
export class Demo {
    demo2: DDDDemo2<Demo4<string>>;
}