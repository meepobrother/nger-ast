import { Plain, PlainPro } from "@nger/plain";
export abstract class Ast {
    abstract visit(visitor: Visitor, context?: any): any;
}
type Child = Service | Message | Enum | OneOf;
@Plain()
export class Root extends Ast {
    @PlainPro({
        isClass: true
    })
    packages: Package[] = [];
    visit(visitor: Visitor, context: any) {
        return visitor.visitRoot(this, context)
    }
}
@Plain()
export class Package extends Ast {
    @PlainPro()
    name: string;
    @PlainPro()
    syntax: string;
    @PlainPro({
        isClass: true
    })
    children: Child[] = [];
    visit(visitor: Visitor, context: any) {
        return visitor.visitPackage(this, context)
    }
    hasChild(name: string) {
        return !!this.children.find(child => child.name === name);
    }
}
@Plain()
export class Identifier extends Ast {
    @PlainPro()
    name: string;
    visit(visitor: Visitor, context: any) {
        return visitor.visitIdentifier(this, context)
    }
}
// enum
@Plain()
export class Enum extends Ast {
    @PlainPro()
    name: string;
    @PlainPro({
        isClass: true
    })
    items: EnumItem[] = [];
    visit(visitor: Visitor, context: any) {
        return visitor.visitEnum(this, context)
    }
}
// enum item
@Plain()
export class EnumItem extends Ast {
    @PlainPro()
    name: string;
    @PlainPro()
    value: any;
    visit(visitor: Visitor, context: any) {
        return visitor.visitEnumItem(this, context)
    }
}
// service
@Plain()
export class Service extends Ast {
    @PlainPro()
    name: string;
    @PlainPro({
        isClass: true
    })
    methods: Method[] = [];
    visit(visitor: Visitor, context: any) {
        return visitor.visitService(this, context)
    }
}
// method finish
@Plain()
export class Method extends Ast {
    // name
    @PlainPro()
    name: string = ``;
    // rpc
    @PlainPro()
    type: string;
    // 请求
    @PlainPro()
    requestType: string;
    @PlainPro()
    requestStream: boolean;
    // 响应
    @PlainPro()
    responseType: string;
    @PlainPro()
    responseStream: boolean;
    visit(visitor: Visitor, context: any) {
        return visitor.visitMethod(this, context)
    }
}
// message
@Plain()
export class Message extends Ast {
    @PlainPro()
    name: string;
    @PlainPro({
        isClass: true
    })
    fields: Field[] = [];
    @PlainPro({
        isClass: true
    })
    children: Child[] = [];
    // 传递
    index: number;
    visit(visitor: Visitor, context: any) {
        return visitor.visitMessage(this, context)
    }
}
// field
@Plain()
export class Field extends Ast {
    // type
    @PlainPro()
    type: string;
    // name
    @PlainPro()
    name: string;
    // id
    @PlainPro()
    id: number;
    // optional
    @PlainPro()
    rule: string;
    // required
    @PlainPro()
    required: boolean;
    // optional
    @PlainPro()
    optional: boolean;

    @PlainPro()
    repeated: boolean;

    @PlainPro()
    defaultValue: any;

    // bytes
    @PlainPro()
    bytes: boolean;

    // extend
    @PlainPro()
    extend: string;

    visit(visitor: Visitor, context: any) {
        return visitor.visitField(this, context)
    }
}
@Plain()
export class OneOf extends Ast {
    @PlainPro()
    name: string;
    @PlainPro({
        isClass: true
    })
    items: Field[] = [];
    @PlainPro()
    oneof: string[];
    visit(visitor: Visitor, context: any) {
        return visitor.visitOneOf(this, context)
    }
}
export interface Visitor {
    visitIdentifier(node: Identifier, context?: any): any;
    visitPackage(node: Package, context?: any): any;
    visitRoot(node: Root, context?: any): any;
    visitEnum(node: Enum, context?: any): any;
    visitEnumItem(node: EnumItem, context?: any): any;
    visitService(node: Service, context?: any): any;
    visitMethod(node: Method, context?: any): any;
    visitMessage(node: Message, context?: any): any;
    visitField(node: Field, context?: any): any;
    visitOneOf(node: OneOf, context?: any): any;
}
export class ParseVisitor implements Visitor {
    visitIdentifier(node: Identifier, context: any): string {
        return node.name;
    }
    visitPackage(node: Package, context: any): string {
        return `syntax = "${node.syntax}";\npackage ${node.name};\n${node.children.map(pack => pack.visit(this, context)).join(`\n`)}`
    }
    visitRoot(node: Root, context: any): string {
        return `${node.packages.map(pack => pack.visit(this, context)).join(`\n`)}`
    }
    visitEnum(node: Enum, context: any): string {
        return `enum ${node.name}{\n\t${node.items.map(item => item.visit(this, context)).join(`\n`)}}`
    }
    visitEnumItem(node: EnumItem, context: any) {
        return `${node.name} = ${node.value}`;
    }
    visitService(node: Service, context: any): string {
        return `service ${node.name} {\n${node.methods.map(method => method.visit(this, context)).join(``)}}`
    }
    visitMethod(node: Method, context: any): string {
        return `\t${node.type === 'rpc' ? 'rpc ' : ""}${node.name}(${node.requestStream ? 'stream' : ""}${node.requestType}) returns(${node.responseStream ? 'stream ' : ''}${node.responseType}) {}\n`
    }
    visitMessage(node: Message, context: any): string {
        return `message ${node.name}{\n${node.fields.map(field => field.visit(this, context)).join(``)}${node.children.map(child => child.visit(this, context)).join(`\n`)}}`;
    }
    visitField(node: Field, context: any): string {
        return `\t${node.repeated ? 'repeated ' : ''}${node.required ? 'required ' : 'optional '} ${node.bytes ? 'bytes' : node.type} ${node.name} = ${node.id}${node.defaultValue ? ` [default=${node.defaultValue}]` : ""}; \n`
    }
    visitOneOf(node: OneOf, context: any): string {
        return `oneof ${node.name} { \n\t${node.items.map(item => item.visit(this, context)).join(`\n`)} } `
    }
    createDecorator(args: string[]) {
        if (args.length > 0) {
            return args.join(' ') + ` `
        }
        return ``
    }
}
