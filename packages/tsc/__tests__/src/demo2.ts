export class Demo3<T> {
    instance3: T;
    dec(a: number, b: number): number {
        return a - b;
    }
}
export class Demo4<T> { 
    title: T;
}
export class Demo2<T> extends Demo3<T> {
    instance: T;
    add(a: number, b: number): number {
        return a + b;
    }
}