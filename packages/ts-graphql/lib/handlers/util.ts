import * as graphql from '@nger/ast.graphql';
export const hasModuleDecorator = hasDecorator(`Module`)
export function hasDecorator(name: string) {
    return (decorators: graphql.DirectiveNode[]) => decorators.find(it => it.name.value === name)
}
export function createTypeNode(val: string, node: graphql.TypeNode): graphql.TypeNode {
    if (node instanceof graphql.ListTypeNode) {
        return createListTypeNode(val)
    }
    else if (node instanceof graphql.NamedTypeNode) {
        return createNamedTypeNode(val)
    }
    else if (node instanceof graphql.NonNullTypeNode) {
        const { type } = node;
        const typeNode = createTypeNode(val, type)
        return createNonNullTypeNode(typeNode)
    } else {
        console.log(`createTypeNode error return createNamedTypeNode`)
        return createNamedTypeNode(val)
    }
}
export function createListTypeNode(val: string): graphql.ListTypeNode {
    const named = createNamedTypeNode(val);
    return new graphql.ListTypeNode(named);
}
export function createNonNullTypeNode(val: graphql.TypeNode): graphql.NonNullTypeNode {
    if (val instanceof graphql.ListTypeNode) {
        return new graphql.NonNullTypeNode(val)
    }
    else if (val instanceof graphql.NamedTypeNode) {
        return new graphql.NonNullTypeNode(val)
    }
    else if (val instanceof graphql.NonNullTypeNode) {
        return new graphql.NonNullTypeNode(val.type)
    }
    else {
        throw new Error(`createNonNullTypeNode errorr`)
    }
}

export function createNamedTypeNode(val: string): graphql.NamedTypeNode {
    return new graphql.NamedTypeNode(
        createNameNode(val)
    )
}
export function createNameNode(val: string): graphql.NameNode {
    return new graphql.NameNode(val);
}

export function getTypeName(type: graphql.TypeNode): string {
    if (type instanceof graphql.NonNullTypeNode) {
        return getTypeName(type.type)
    } else if (type instanceof graphql.NamedTypeNode) {
        return type.name.value;
    } else {
        return getTypeName(type.type)
    }
}

export function getType(type: graphql.TypeNode): graphql.ListTypeNode | graphql.NamedTypeNode {
    if (type instanceof graphql.NonNullTypeNode) {
        return getType(type.type);
    } else if (type instanceof graphql.NameNode) {
        const ast = new graphql.NamedTypeNode();
        ast.name = type;
        return ast;
    } else {
        return type;
    }
}