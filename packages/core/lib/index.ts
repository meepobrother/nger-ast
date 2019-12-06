export class Int32 extends Number { }
export class Float extends Number {
    valueOf() {
        return parseFloat(this.toPrecision(6));
    }
}
export class Double extends Number {
    valueOf() {
        return parseFloat(this.toPrecision(15));
    }
}
export class Bool extends Boolean { }
export class Bytes extends Buffer { }
export class Uint32 extends Number { }
export class Sint32 extends Number { }
export class Fixed32 extends Number { }
export class Sfixed32 extends Number { }
export class Uint64 extends Number { }
export class Int64 extends Number { }
export class Sint64 extends Number { }
export class Fixed64 extends Number { }
export class Sfixed64 extends Number { }
export interface Demo {
    title?: string;
    title2?: string;
    title3?: string;
}