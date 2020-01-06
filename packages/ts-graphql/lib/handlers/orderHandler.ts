import { TypeHandler } from "./typeHandler";
import { createNameNode, createNamedTypeNode, createStringValueNode } from './util';
import * as graphql from '@nger/ast.graphql';

export class OrderTypeHandler implements TypeHandler {
    name: 'Order' = 'Order';
    build(node: graphql.ObjectTypeDefinitionNode, dest: graphql.InputObjectTypeDefinitionNode): graphql.InputObjectTypeDefinitionNode {
        const fields: graphql.InputValueDefinitionNode[] = [];
        (node.fields || []).map(it => {
            const item = new graphql.InputValueDefinitionNode();
            item.name = createNameNode(it.name.value);
            item.description = createStringValueNode(`排序:ASC升序 DESC降序`);
            item.directives = it.directives;
            item.type = createNamedTypeNode('String')
            fields.push(item);
        })
        dest.fields = fields;
        return dest;
    }
}
