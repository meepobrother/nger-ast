import * as graphql from '@nger/ast.graphql';
export interface TypeHandler {
    name: string;
    build(node: graphql.ObjectTypeDefinitionNode, dest: graphql.InputObjectTypeDefinitionNode): graphql.InputObjectTypeDefinitionNode;
}
