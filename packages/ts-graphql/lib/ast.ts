import * as tsc from '@nger/ast.tsc';
import * as ts from 'typescript';
import * as graphql from '@nger/ast.graphql';
import { createNamedTypeNode, createTypeNode, createNameNode } from './handlers/util';
import { TsGraphqlVisitor } from './ts-graphql';
import { CompilerContext } from './compiler';
function handlerName(val: string) {
    switch (val) {
        case 'Int':
        case 'Int32':
        case 'Int64':
        case 'Uint32':
        case 'Sint32':
        case 'Uint64':
        case 'Int64':
        case 'Sint64':
            return 'Int';
        case 'String':
            return 'String';
        case 'Double':
        case 'Float':
        case 'Fixed32':
        case 'Sfixed32':
        case 'Fixed64':
        case 'Sfixed64':
            return 'Float';
        case 'Bool':
        case 'Boolean':
        case 'boolean':
            return 'Boolean';
        case 'Id':
            return 'Id';
        default:
            return val;
    }
}
function getTypeName(node: graphql.NamedTypeNode | graphql.ListTypeNode | graphql.NonNullTypeNode | graphql.NameNode): string {
    if (node instanceof graphql.NamedTypeNode) {
        return handlerName(node.name.value);
    } else if (node instanceof graphql.ListTypeNode) {
        return getTypeName(node.type)
    } else if (node instanceof graphql.NameNode) {
        return handlerName(node.value);
    } else {
        return getTypeName(node.type)
    }
}
type GraphqlType = graphql.NamedTypeNode | graphql.ListTypeNode | undefined;
export abstract class TypeNode {
    _type: any;
    context: CompilerContext;
    visitor: TsGraphqlVisitor;
    node: tsc.TypeNode | tsc.TypeAliasDeclaration;
    isInput: boolean;
    createType(isStatement: boolean = false) {
        if (this._type) return this._type;
        try {
            this._type = this.getType(undefined, isStatement);
            return this._type;
        } catch (e) {
            console.log(e)
        }
    }
    abstract getType(nodes?: (TypeNode | graphql.TypeParameter)[], isStatement?: boolean): GraphqlType | undefined;
    abstract getName(): string;
    getTscType(): ts.Type {
        throw new Error(`getTscType Error`)
    }
    getFullName(): string {
        if (this.createType()) {
            return getTypeName(this.createType())
        }
        return ``;
    }
    handleInterface(node: graphql.ObjectTypeDefinitionNode | graphql.InputObjectTypeDefinitionNode, nodes?: (TypeNode | graphql.TypeParameter)[]) {
        if (node.fields) {
            node.fields = (node.fields as any).filter((it: any) => !!it).map((it: any) => {
                const _nodes = nodes;
                const _typeParameters = node.typeParameters;
                if (_typeParameters) {
                    const index = _typeParameters.findIndex(parameter => {
                        if (it.type instanceof graphql.NonNullTypeNode) {
                            const type = it.type.type as any;
                            if (type instanceof TypeNode) {
                                const getName = type.getName();
                                return getName === parameter.name.value;
                            }
                            if (type instanceof graphql.NamedTypeNode) {
                                return getTypeName(type) === parameter.name.value;
                            }
                        }
                        return getTypeName(it.type) === parameter.name.value;
                    });
                    if (_nodes) {
                        const node = Reflect.get(_nodes, index)
                        if (node instanceof TypeNode) {
                            const type = node.createType();
                            if (type) {
                                it.type = createTypeNode(getTypeName(type), it.type)
                            }
                        }
                        if (node instanceof graphql.TypeParameter) {
                            debugger;
                        }
                    }
                }
                if (it.type instanceof graphql.NonNullTypeNode) {
                    const type = it.type.type;
                    if (type instanceof TypeNode) {
                        const typeNode = type.createType();
                        if (typeNode) it.type = new graphql.NonNullTypeNode(typeNode)
                    }
                    if (type instanceof graphql.NamedTypeNode) {
                        if (type) it.type = new graphql.NonNullTypeNode(type)
                    }
                }
                it.type = createTypeNode(getTypeName(it.type), it.type)
                return it;
            });
        }
        return node;
    }
    transformTypeToInput(node: graphql.ObjectTypeDefinitionNode): graphql.InputObjectTypeDefinitionNode {
        const ast = new graphql.InputObjectTypeDefinitionNode();
        ast.name = createNameNode(node.name.value + 'Input');
        ast.directives = node.directives;
        ast.description = node.description;
        ast.typeParameters = node.typeParameters;
        if (node.fields) ast.fields = node.fields.map(it => {
            const item = new graphql.InputValueDefinitionNode();
            item.name = it.name;
            item.description = it.description;
            item.directives = it.directives;
            item.type = it.type;
            return item;
        })
        return ast;
    }
    static cacheTsType: Map<any, any> = new Map();
    createTsType(type: ts.Type, isInput: boolean, nodes?: (TypeNode | graphql.TypeParameter)[], name?: string): undefined | graphql.TypeNode | graphql.ObjectTypeDefinitionNode | graphql.InputObjectTypeDefinitionNode {
        const token = { type, isInput, nodes };
        if (TypeNode.cacheTsType.has(token)) {
            return TypeNode.cacheTsType.get(token)
        }
        const { symbol, aliasSymbol, aliasTypeArguments, pattern } = type;
        if (symbol || aliasSymbol) {
            const ast = this.context.create(aliasSymbol || symbol);
            if (ast && typeof ast.visit !== 'function') {
                return;
            }
            try {
                if (ast) {
                    const node = ast.visit(this.visitor, this.context);
                    if (node instanceof graphql.TypeParameter) {
                        TypeNode.cacheTsType.set(token, node.default)
                        return node.default;
                    }
                    if (node instanceof graphql.ObjectTypeDefinitionNode) {
                        node.name = createNameNode(name || node.name.value)
                        if (nodes && Array.isArray(nodes)) {
                            const nodeName = nodes.reverse().map(node => {
                                if (node instanceof TypeNode) {
                                    return node.getFullName()
                                } else if (node instanceof graphql.TypeParameter) {
                                    return node.name.value;
                                }
                            }).join('');
                            node.name = createNameNode(nodeName + (name || node.name.value))
                        }
                        this.handleInterface(node, nodes)
                        if (isInput) {
                            return this.transformTypeToInput(node)
                        }
                        TypeNode.cacheTsType.set(token, node)
                        return node;
                    }
                    if (node instanceof TypeNode) {
                        const type = node.getType(nodes as any, true);
                        TypeNode.cacheTsType.set(token, type)
                        return type;
                    }
                }
            } catch (e) {
                return;
            }
            return;
        }
        throw new Error(`type not found`)
    }
}
export class KeywordTypeNode extends TypeNode {
    getName(): string {
        return this.node.keyword;
    }
    constructor(public node: tsc.KeywordTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
    getType(nodes?: TypeNode[]): graphql.NamedTypeNode {
        const { keyword } = this.node;
        let value: string = 'Json';
        switch (keyword) {
            case 'string':
                value = 'String';
                break;
            case 'any':
                value = 'Object';
                break;
            case 'number':
                value = 'Int';
                break;
            case 'void':
                value = 'Void';
                break;
            case 'boolean':
                value = 'Boolean';
                break;
            default:
                value = `Object`;
                break;
        }
        return createNamedTypeNode(value);
    }
}
export class ThisTypeNode extends TypeNode {
    getName(): string {
        return ``
    }
    getType() {
        return undefined;
    }
    constructor(public node: tsc.ThisTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class FunctionTypeNode extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.FunctionTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class ConstructorTypeNode extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.ConstructorTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class TypeReferenceNode extends TypeNode {
    getName(): string {
        const { typeName } = this.node.toJson(this.visitor, this.context);
        return handlerName(typeName.value);
    }
    getTscType() {
        const { typeName } = this.node.toJson(this.visitor, this.context);
        const { __type } = typeName;
        return __type;
    }
    static cache: Map<any, any> = new Map();
    getType(nodes?: TypeNode[], isStatement: boolean = false): GraphqlType {
        if (!nodes && TypeReferenceNode.cache.has(this.node.__node)) {
            return TypeReferenceNode.cache.get(this.node.__node)
        }
        const { typeArguments, typeName } = this.node.toJson(this.visitor, this.context);
        if (typeName) {
            const { __type } = typeName;
            const name = typeName.value;
            if (name === 'Buffer' || name === "Uint8Array") {
                return createNamedTypeNode(`Buffer`)
            }
            if (name === 'Object') {
                return createNamedTypeNode(`Object`)
            }
            if (name === 'DateConstructor') {
                return createNamedTypeNode(`Date`)
            }
            if (name === 'Function') {
                return;
            }
            if (name === 'BooleanConstructor') {
                return createNamedTypeNode(`Boolean`);
            }
            const tsType = this.createTsType(__type, this.isInput, nodes || typeArguments, name);
            if (!tsType || name === 'AsyncIterator' || name === 'Promise' || name === 'Observable' || name === 'Subject' || name === 'PromiseLike') {
                if (typeArguments && typeArguments.length > 0) {
                    try {
                        let res = typeArguments[0].getType(nodes, isStatement);
                        TypeReferenceNode.cache.set(this.node.__node, res)
                        return res;
                    } catch (e) {
                        let res = this.createType(isStatement);
                        TypeReferenceNode.cache.set(this.node.__node, res)
                        return res;
                    }
                }
            }
            if (tsType instanceof graphql.ObjectTypeDefinitionNode) {
                if (isStatement)
                    this.context.setStatements([tsType])
                let res = createNamedTypeNode(tsType.name.value)
                TypeReferenceNode.cache.set(this.node.__node, res)
                return res;
            }
            if (tsType instanceof graphql.InputObjectTypeDefinitionNode) {
                if (isStatement)
                    this.context.setStatements([tsType])
                let res = createNamedTypeNode(tsType.name.value)
                TypeReferenceNode.cache.set(this.node.__node, res)
                return res;
            }
            if (tsType instanceof TypeNode) {
                let res = tsType.getType(typeArguments, isStatement)
                TypeReferenceNode.cache.set(this.node.__node, res)
                return res;
            }
            if (tsType instanceof graphql.NamedTypeNode) {
                let res = createNamedTypeNode(tsType.name.value)
                TypeReferenceNode.cache.set(this.node.__node, res)
                return res;
            }
            let res = createNamedTypeNode(typeName.value)
            TypeReferenceNode.cache.set(this.node.__node, res)
            return res;
        }

    }
    constructor(public node: tsc.TypeReferenceNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class TypePredicateNode extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.TypePredicateNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class TypeQueryNode extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.TypeQueryNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class TypeLiteralNode extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.TypeLiteralNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class ArrayTypeNode extends TypeNode {
    getName(): string {
        const elementType = this.node.elementType.visit(this.visitor, this.context);
        if (elementType) {
            return elementType.getName() + 's'
        }
        return ``
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        let elementType: any;
        if (!this.node.elementType.visit) {
            const node = this.context.create(this.node.elementType)
            if (node) elementType = node.visit(this.visitor, this.context)
        } else {
            elementType = this.node.elementType.visit(this.visitor, this.context);
        }
        if (elementType) {
            const type = elementType.getType(nodes)
            if (type instanceof graphql.NamedTypeNode) {
                return new graphql.ListTypeNode(type);
            }
        }
    }
    constructor(public node: tsc.ArrayTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class TupleTypeNode extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.TupleTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class OptionalTypeNode extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.OptionalTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class RestTypeNode extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.RestTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class UnionTypeNode extends TypeNode {
    getName(): string {
        return ``
    }
    getType(nodes?: TypeNode[], isStatement: boolean = false): any {
        const { types } = this.node.toJson(this.visitor, this.context);
        const ast = new graphql.UnionTypeDefinitionNode();
        ast.types = types.map((it: any) => {
            if (it instanceof TypeNode) {
                const type = it.getType(nodes, isStatement);
                if (type) {
                    return createNamedTypeNode(it.getFullName(), type.__value)
                }
                return it;
            }
        })
        return ast;
    }
    constructor(public node: tsc.UnionTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class IntersectionTypeNode extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.IntersectionTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class ConditionalTypeNode extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.ConditionalTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class InferTypeNode extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.InferTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class ParenthesizedTypeNode extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.ParenthesizedTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class TypeOperatorNode extends TypeNode {
    getName(): string {
        return ``
    }
    getType(nodes?: TypeNode[]): any {
        const { operator, type } = this.node.toJson(this.visitor, this.context);
        let name: string = ``;
        switch (operator) {
            case ts.SyntaxKind.KeyOfKeyword:
                name = `keyof`;
                break;
            case ts.SyntaxKind.UniqueKeyword:
                name = 'unique';
                break;
            case ts.SyntaxKind.ReadonlyKeyword:
                name = 'readonly'
                break;
        }
        if (name.length > 0) return createNamedTypeNode(name, type)

    }
    constructor(public node: tsc.TypeOperatorNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class TypeAliasDeclaration extends TypeNode {
    getName(): string {
        throw new Error(`TypeAliasDeclaration Error`)
    }
    constructor(public node: tsc.TypeAliasDeclaration, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
    getType(nodes?: TypeNode[], isStatement: boolean = true) {
        const { typeParameters, type, name } = this.node.toJson(this.visitor, this.context);
        if (type instanceof TypeReferenceNode) {
            return type.getType(nodes, isStatement)
        }
        if (type instanceof UnionTypeNode) {
            const typeNode = type.getType(nodes, isStatement) as graphql.UnionTypeDefinitionNode;
            typeNode.name = name;
            if (isStatement) this.context.setStatements([typeNode]);
            return createNamedTypeNode(name.value)
        }
        let pre = ``
        if (nodes) {
            pre += nodes.reverse().map(it => it.getFullName()).join('')
        }
        if (this.isInput) {
            const graphqlType = new graphql.InputObjectTypeDefinitionNode();
            graphqlType.name = createNameNode(pre + name.value);
            graphqlType.typeParameters = typeParameters;
            if (type instanceof TypeNode) {
                type.handleInterface(graphqlType, nodes)
            }
            if (isStatement)
                this.context.setStatements([graphqlType]);
        } else {
            const graphqlType = new graphql.ObjectTypeDefinitionNode();
            graphqlType.name = createNameNode(pre + name.value);
            graphqlType.typeParameters = typeParameters;
            if (type instanceof TypeNode) {
                if (type instanceof TypeReferenceNode) {
                    type.handleInterface(graphqlType, nodes)
                } else {
                    type.handleInterface(graphqlType, nodes)
                }
            }
            if (isStatement)
                this.context.setStatements([graphqlType]);
        }
        return createNamedTypeNode(pre + name.value);
    }
}
export class MappedTypeNode extends TypeNode {
    getName(): string {
        return ``
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        return undefined
    }
    getTscType(): any {
        throw new Error(`getTscType type`)
    }
    constructor(public node: tsc.MappedTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
    handleInterface(node: graphql.ObjectTypeDefinitionNode, nodes?: TypeNode[]) {
        const { readonlyToken, typeParameter, questionToken, type } = this.node.toJson(this.visitor, this.context);
        // 获取User所有属性
        const objs = {
            readonlyToken,
            questionToken
        };
        if (node.typeParameters) {
            if (!Array.isArray(node.typeParameters)) {
                debugger;
            }
            node.typeParameters.map((type: graphql.TypeParameter, index: number) => {
                let __node: any;
                if (nodes) {
                    __node = Reflect.get(nodes, index);
                    if (__node) {
                        let ast = __node.type
                        const { constraint, default: _def, expression, name, type: _type } = type;
                        if (constraint) {
                            if (constraint instanceof TypeOperatorNode) {
                                const operator = constraint.createType();
                                if (operator) {
                                    if (getTypeName(operator) === 'keyof') {
                                        const val = operator.__value;
                                        if (val instanceof TypeReferenceNode) {
                                            const type = val.createType();
                                            if (type) {
                                                const typeName = getTypeName(type);
                                                const val = Reflect.get(objs, typeName) || ast;
                                                if (val instanceof graphql.UnionTypeDefinitionNode) {
                                                    if (val.types) {
                                                        const keys = val.types.map(t => t.__value)
                                                        Reflect.set(objs, name.value, keys)
                                                    }
                                                } else {
                                                    console.log(`handleInterface error`)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if (ast instanceof graphql.NameNode) {
                                ast = this.context.statements.find(it => it.name.value === ast.value)
                            }
                            if (ast instanceof graphql.NamedTypeNode) {
                                ast = this.context.statements.find(it => it.name.value === ast.name.value)
                            }
                            Reflect.set(objs, type.name.value, ast)
                        }
                    }
                }
            })
        }
        if (type instanceof TypeNode) {
            type.handleInterface(node, objs as any)
        }
        return node;
    }
}
export class IndexedAccessTypeNode extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.IndexedAccessTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
    handleInterface(node: graphql.ObjectTypeDefinitionNode, nodes?: TypeNode[]) {
        const { indexType, objectType } = this.node.toJson(this.visitor, this.context);
        // 获取User所有属性
        const indexName = indexType.getName();
        const objectName = objectType.getName();
        if (nodes) {
            const ast = Reflect.get(nodes, objectName)
            const input = Reflect.get(nodes, indexName)
            const questionToken = Reflect.get(nodes, 'questionToken');
            if (ast instanceof graphql.UnionTypeDefinitionNode) {
                if (ast.types) ast.types.map(it => {
                    if (it.__value) {
                        debugger;
                    }
                })
            }
            if (ast && Array.isArray(ast.fields)) {
                if (questionToken) {
                    node.fields = ast.fields.filter((it: any) => !!it).map((it: graphql.FieldDefinitionNode) => {
                        const item = new graphql.FieldDefinitionNode();
                        item.name = it.name;
                        item.description = it.description;
                        item.directives = it.directives;
                        item.type = it.type;
                        if (it.type instanceof graphql.NonNullTypeNode) {
                            item.type = it.type.type;
                        }
                        return item;
                    });
                } else {
                    node.fields = ast.fields.filter((it: any) => !!it).map((it: graphql.FieldDefinitionNode) => {
                        const item = new graphql.FieldDefinitionNode();
                        item.name = it.name;
                        item.description = it.description;
                        item.directives = it.directives;
                        const { type } = it;
                        if (type instanceof graphql.NonNullTypeNode) {
                            item.type = createTypeNode(getTypeName(type), type)
                        } else {
                            item.type = new graphql.NonNullTypeNode(type)
                        }
                        return item;
                    });
                }
            }
        }
        return node;
    }
}
export class LiteralTypeNode extends TypeNode {
    getName(): string {
        return ``
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        const literal = this.node.literal.visit(this.visitor, this.context);
        if (literal instanceof graphql.StringValueNode) {
            return createNamedTypeNode('String', literal.value)
        }
        if (literal instanceof graphql.BooleanValueNode) {
            return createNamedTypeNode('Boolean', literal.value)
        }
        if (literal instanceof graphql.FloatValueNode) {
            return createNamedTypeNode('Float', literal.value)
        }
        if (literal instanceof graphql.IntValueNode) {
            return createNamedTypeNode('Int', literal.value)
        }
        throw new Error(`LiteralTypeNode`);
    }
    constructor(public node: tsc.LiteralTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class JSDocTypeExpression extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.JSDocTypeExpression, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class JSDocNamepathType extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.JSDocNamepathType, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class JSDocVariadicType extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.JSDocVariadicType, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class JSDocFunctionType extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.JSDocFunctionType, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class JSDocOptionalType extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.JSDocOptionalType, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class JSDocNullableType extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.JSDocNullableType, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class JSDocNonNullableType extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.JSDocNonNullableType, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class JSDocUnknownType extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.JSDocUnknownType, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class JSDocAllType extends TypeNode {
    getName(): string {
        return ``
    }
    getType(): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.JSDocAllType, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}