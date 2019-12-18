import { Plain, PlainPro } from '@nger/plain';
@Plain()
export class List {
    @PlainPro({ isClass: true })
    statement: Statement[];
    @PlainPro()
    type: string;
    @PlainPro()
    variant: string;
}
export type Statement = Update;
@Plain()
export class Update {
    @PlainPro({ isClass: true })
    into: Identifier;
    @PlainPro({ isClass: true })
    set: any[];
    @PlainPro({ isClass: true })
    where: any[];
    @PlainPro()
    type: string;
    @PlainPro()
    variant: string;
}
@Plain()
export class Assignment {
    @PlainPro({ isClass: true })
    target: Identifier;
    @PlainPro({ isClass: true })
    value: Identifier;
    @PlainPro()
    type: string;
}
@Plain()
export class Identifier {
    @PlainPro()
    name: string;
    @PlainPro()
    type: string;
    @PlainPro()
    variant: string;
}

export class Expression { }
export class BinaryExpression {
    left: Literal;
    right: Literal;
}

export class Literal {
    type: string;
    value: string;
    variant: string;
}

export enum Operator {
    eq,
    ne,
    gte,
    gt,
    lte,
    lt,
    not,
    is,
    in,
    notIn,
    like,
    notLike,
    iLike,
    notILike,
    startsWith,
    endsWith,
    substring,
    regexp,
    notRegexp,
    iRegexp,
    notIRegexp,
    between,
    notBetween,
    overlap,
    contains,
    contained,
    adjacent,
    strictLeft,
    strictRight,
    noExtendRight,
    noExtendLeft,
    and,
    or,
    any,
    all,
    values,
    col,
    placeholder,
    join
}