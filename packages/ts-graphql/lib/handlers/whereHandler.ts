import { TypeHandler } from "./typeHandler";
import { createNameNode, createListTypeNode, getTypeName, createTypeNode, createNamedTypeNode } from './util';
import * as graphql from '@nger/ast.graphql';

export class WhereTypeHandler implements TypeHandler {
    name: 'Where' = 'Where';
    private description: { [key: string]: string } = {
        Not: `不等于`,
        In: `在制定内，如[1,2,3,...]`,
        Lt: `小于`,
        Lte: `小于等于`,
        Gt: `大于`,
        Gte: `大于等于`,
        Like: `包含,左{title: "a%"} 右边{title: "%a"} 包含{title: "%a%"}`,
        Between: `指定范围[min,max]`
    }
    build(node: graphql.ObjectTypeDefinitionNode, dest: graphql.InputObjectTypeDefinitionNode): graphql.InputObjectTypeDefinitionNode {
        const fields: graphql.InputValueDefinitionNode[] = [];
        (node.fields || []).map(it => {
            const item = new graphql.InputValueDefinitionNode();
            item.name = createNameNode(it.name.value);
            item.description = it.description;
            item.directives = it.directives;
            item.type = it.type;
            fields.push(item);
            ['In', 'Lt', 'Lte', 'Gt', 'Gte', 'Between', 'Like'].map(pre => {
                const item = new graphql.InputValueDefinitionNode();
                item.name = createNameNode(it.name.value + '_' + pre);
                const typeName = getTypeName(it.type)
                if (pre === 'In' || pre === 'Between') {
                    item.type = createListTypeNode(typeName);
                    if (typeName === "Int") {
                        fields.push(item);
                    }
                    if (pre === 'Between' && typeName === 'Date') {
                        fields.push(item);
                    }
                } else {
                    if (pre === 'Lt' || pre === "Lte" || pre === 'Gt' || pre === 'Gte') {
                        item.type = createNamedTypeNode(typeName);
                        if (typeName === "Int" || typeName === 'Date') {
                            fields.push(item);
                        }
                    }
                    if (pre === 'Like' && typeName === 'String') {
                        item.type = createNamedTypeNode(typeName);
                        fields.push(item);
                    }
                }
            })
        })
        const and = new graphql.InputValueDefinitionNode();
        and.name = createNameNode('AND');
        and.type = createListTypeNode(dest.name.value)
        fields.push(and)

        const or = new graphql.InputValueDefinitionNode();
        or.name = createNameNode('OR');
        or.type = createListTypeNode(dest.name.value)
        fields.push(or)
        dest.fields = fields;
        return dest;
    }
}
