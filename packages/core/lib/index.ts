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
export class Id extends String { }
export class Int32 extends Number { }
export class Uint32 extends Number { }
export class Sint32 extends Number { }
export class Uint64 extends Number { }
export class Int64 extends Number { }
export class Sint64 extends Number { }

export class Fixed32 extends Number { }
export class Sfixed32 extends Number { }
export class Fixed64 extends Number { }
export class Sfixed64 extends Number { }

export interface Where<T> {
    'AND': Where<T>;
    'OR': Where<T>;
    // key_Lt
    [key: string]: any;
}
export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
}
export type Simple<T> = {
    [P in keyof T]?: T[P];
}
export type Order<T> = {
    [P in keyof T]?: "ASC" | "DESC";
}
export type ID = string | number;
