import * as tsc from '@nger/ast.tsc';
import * as ts from 'typescript';
import * as graphql from '@nger/ast.graphql';
import { createNamedTypeNode, createTypeNode, createNameNode } from './handlers/util';
import { TsGraphqlVisitor } from './ts-graphql';
import { CompilerContext } from './compiler';
function getTypeName(node: graphql.NamedTypeNode | graphql.ListTypeNode | graphql.NonNullTypeNode): string {
    if (node instanceof graphql.NamedTypeNode) {
        return node.name.value;
    } else if (node instanceof graphql.ListTypeNode) {
        return getTypeName(node.type)
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
    get type() {
        if (this._type) return this._type;
        this._type = this.getType();
        return this._type;
    }
    abstract getType(nodes?: (TypeNode | graphql.TypeParameter)[]): GraphqlType;
    abstract getName(): string;
    getTscType(): ts.Type {
        throw new Error(`getTscType Error`)
    }
    getFullName(): string {
        return getTypeName(this.type)
    }
    handleInterface(node: graphql.ObjectTypeDefinitionNode | graphql.InputObjectTypeDefinitionNode, nodes?: (TypeNode | graphql.TypeParameter)[]) {
        if (node.fields) {
            node.fields = (node.fields as any).map((it: any) => {
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
                        } else {
                            return getTypeName(it.type) === parameter.name.value;
                        }
                        return false;
                    });
                    if (_nodes) {
                        const node = Reflect.get(_nodes, index)
                        if (node instanceof TypeNode) {
                            const type = node.getType(nodes as any);
                            if (type) {
                                if (it.type instanceof graphql.NonNullTypeNode) {
                                    it.type = new graphql.NonNullTypeNode(type)
                                }
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
                        const typeNode = type.getType();
                        if (typeNode) it.type = new graphql.NonNullTypeNode(typeNode)
                    }
                }
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
    createTsType(type: ts.Type, isInput: boolean, nodes?: (TypeNode | graphql.TypeParameter)[]): undefined | graphql.TypeNode | graphql.ObjectTypeDefinitionNode | graphql.InputObjectTypeDefinitionNode {
        const { symbol, aliasSymbol, aliasTypeArguments, pattern } = type;
        if (symbol) {
            const ast = this.context.create(aliasSymbol || symbol);
            if (ast && typeof ast.visit !== 'function') {
                return;
            }
            if (ast) {
                const node = ast.visit(this.visitor, this.context);
                if (node instanceof graphql.TypeParameter) {
                    return node.default;
                }
                if (node instanceof graphql.ObjectTypeDefinitionNode) {
                    this.handleInterface(node, nodes)
                    if (nodes && Array.isArray(nodes)) {
                        node.name = createNameNode(nodes.reverse().map(node => {
                            if (node instanceof TypeNode) {
                                return node.getFullName()
                            } else if (node instanceof graphql.TypeParameter) {
                                return node.name.value;
                            }
                        }).join('') + node.name.value)
                    }
                    if (isInput) {
                        return this.transformTypeToInput(node)
                    }
                    return node;
                }
                if (node instanceof TypeNode) {
                    return node.getType(nodes as any);
                }
            }
            return;
        }
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
                value = 'Json';
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
                value = `Json`;
                break;
        }
        return createNamedTypeNode(value);
    }
}
export class ThisTypeNode extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.ThisTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class FunctionTypeNode extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
    getType(): GraphqlType {
        throw new Error("Method not implemented.");
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
        return typeName.value;
    }
    getTscType() {
        const { typeName } = this.node.toJson(this.visitor, this.context);
        const { __type } = typeName;
        return __type;
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        const { typeArguments, typeName } = this.node.toJson(this.visitor, this.context);
        if (typeName) {
            const { __type } = typeName;
            const tsType = this.createTsType(__type, this.isInput, typeArguments);
            if (!tsType) {
                if (typeArguments && typeArguments.length > 0) return typeArguments[0].getType(nodes)
            }
            if (tsType instanceof graphql.ObjectTypeDefinitionNode) {
                this.context.setStatements([tsType])
                return createNamedTypeNode(tsType.name.value)
            }
            if (tsType instanceof graphql.InputObjectTypeDefinitionNode) {
                this.context.setStatements([tsType])
                return createNamedTypeNode(tsType.name.value)
            }
            if (tsType instanceof TypeNode) {
                return tsType.getType(typeArguments)
            }
            if (tsType instanceof graphql.NamedTypeNode) {
                return createNamedTypeNode(tsType.name.value)
            }
            return createNamedTypeNode(typeName.value)
        }
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.TypeReferenceNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class TypePredicateNode extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.TypePredicateNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class TypeQueryNode extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.TypeQueryNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class TypeLiteralNode extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        const elementType = this.node.elementType.visit(this.visitor, this.context);
        if (elementType) {
            const type = elementType.getType(nodes)
            return new graphql.ListTypeNode(type);
        };
        throw new Error(`ArrayTypeNode get type Error`)
    }
    constructor(public node: tsc.ArrayTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class TupleTypeNode extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.TupleTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class OptionalTypeNode extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.OptionalTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class RestTypeNode extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.RestTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class UnionTypeNode extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        return undefined;
    }
    constructor(public node: tsc.UnionTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class IntersectionTypeNode extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.IntersectionTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class ConditionalTypeNode extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.ConditionalTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class InferTypeNode extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.InferTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class ParenthesizedTypeNode extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.ParenthesizedTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class TypeOperatorNode extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
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
    getType(nodes?: TypeNode[]): graphql.NamedTypeNode {
        const { typeParameters, type, name } = this.node.toJson(this.visitor, this.context);
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
            this.context.setStatements([graphqlType]);
        } else {
            const graphqlType = new graphql.ObjectTypeDefinitionNode();
            graphqlType.name = createNameNode(pre + name.value);
            graphqlType.typeParameters = typeParameters;
            if (type instanceof TypeNode) {
                type.handleInterface(graphqlType, nodes)
            }
            this.context.setStatements([graphqlType]);
        }
        return createNamedTypeNode(pre + name.value);
    }
}
export class MappedTypeNode extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
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
                        const tscNode = __node.getTscType();
                        const ast = __node.createTsType(tscNode, this.isInput, nodes)
                        Reflect.set(objs, type.name.value, ast)
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
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
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
            const questionToken = Reflect.get(nodes, 'questionToken')
            if (ast && Array.isArray(ast.fields)) {
                if (questionToken) {
                    node.fields = ast.fields.map((it: graphql.FieldDefinitionNode) => {
                        const { name, type } = it;
                        if (type instanceof graphql.NonNullTypeNode) {
                            it.type = type.type;
                        }
                        return it;
                    });
                } else {
                    node.fields = ast.fields.map((it: graphql.FieldDefinitionNode) => {
                        const { name, type } = it;
                        if (type instanceof graphql.NonNullTypeNode) {
                        } else {
                            it.type = new graphql.NonNullTypeNode(type)
                        }
                        return it;
                    });
                }
            }
        }
        return node;
    }
}
export class LiteralTypeNode extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.LiteralTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class JSDocTypeExpression extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.JSDocTypeExpression, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class JSDocNamepathType extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.JSDocNamepathType, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class JSDocVariadicType extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.JSDocVariadicType, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class JSDocFunctionType extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.JSDocFunctionType, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class JSDocOptionalType extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.JSDocOptionalType, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class JSDocNullableType extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.JSDocNullableType, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class JSDocNonNullableType extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.JSDocNonNullableType, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class JSDocUnknownType extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.JSDocUnknownType, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class JSDocAllType extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(public node: tsc.JSDocAllType, visitor: TsGraphqlVisitor, context: CompilerContext, public isInput: boolean) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}