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
    get type() {
        if (this._type) return this._type;
        this._type = this.getType();
        return this._type;
    }
    abstract getType(nodes?: TypeNode[]): GraphqlType;
    abstract getName(): string;
    getFullName(): string {
        return getTypeName(this.type)
    }
    handleInterface(node: graphql.ObjectTypeDefinitionNode, nodes?: TypeNode[]) {
        if (node.fields) {
            node.fields = node.fields.map(it => {
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
                        }
                        return false;
                    });
                    if (_nodes) {
                        const node = Reflect.get(_nodes, index)
                        if (node instanceof TypeNode) {
                            const type = node.getType(nodes);
                            if (type) {
                                if (it.type instanceof graphql.NonNullTypeNode) {
                                    it.type = new graphql.NonNullTypeNode(type)
                                }
                                it.type = createTypeNode(getTypeName(type), it.type)
                            }
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
    createTsType(type: ts.Type, nodes?: TypeNode[]): undefined | graphql.TypeNode | graphql.ObjectTypeDefinitionNode {
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
                    if (nodes) {
                        node.name = createNameNode(node.name.value + nodes.map(node => node.getFullName()).join(''))
                    }
                    return node;
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
    constructor(private node: tsc.KeywordTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.ThisTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.FunctionTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.ConstructorTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    getType(nodes?: TypeNode[]): GraphqlType {
        const { typeArguments, typeName } = this.node.toJson(this.visitor, this.context);
        if (typeName) {
            const { __type } = typeName;
            const tsType = this.createTsType(__type, typeArguments);
            if (!tsType) {
                if (typeArguments && typeArguments.length > 0) return typeArguments[0].getType(nodes)
            }
            if (tsType instanceof graphql.ObjectTypeDefinitionNode) {
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
    constructor(private node: tsc.TypeReferenceNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.TypePredicateNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.TypeQueryNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.TypeLiteralNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.ArrayTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.TupleTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.OptionalTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.RestTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.UnionTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.IntersectionTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.ConditionalTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.InferTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.ParenthesizedTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.TypeOperatorNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class IndexedAccessTypeNode extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(private node: tsc.IndexedAccessTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class MappedTypeNode extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(private node: tsc.MappedTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}
export class LiteralTypeNode extends TypeNode {
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getType(nodes?: TypeNode[]): GraphqlType {
        throw new Error("Method not implemented.");
    }
    constructor(private node: tsc.LiteralTypeNode, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.JSDocTypeExpression, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.JSDocNamepathType, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.JSDocVariadicType, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.JSDocFunctionType, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.JSDocOptionalType, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.JSDocNullableType, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.JSDocNonNullableType, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.JSDocUnknownType, visitor: TsGraphqlVisitor, context: CompilerContext) {
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
    constructor(private node: tsc.JSDocAllType, visitor: TsGraphqlVisitor, context: CompilerContext) {
        super();
        this.visitor = visitor;
        this.context = context;
    }
}