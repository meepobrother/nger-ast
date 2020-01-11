import * as ts from 'typescript'
import * as graphql from '@nger/ast.graphql'
export function typeNodeToGraphql(type: ts.TypeNode, typeChecker: ts.TypeChecker) {
    const _type = typeChecker.getTypeFromTypeNode(type)
    return typeToGraphql(_type, typeChecker)
}

export function typeToGraphql(type: ts.Type, typeChecker: ts.TypeChecker) {
    const typeToString = typeChecker.typeToString(
        type
    );
    const properties = type.getProperties()
    return typeToString
}
const inputs: graphql.InputObjectTypeDefinitionNode[] = []
export function typeToGraphqlInput(node: ts.Type, typeChecker: ts.TypeChecker) {
    const input = new graphql.InputObjectTypeDefinitionNode();
    const fields = [];
    const properties = node.getProperties();
    properties.map(it => {
        
    })
    return input;
}
