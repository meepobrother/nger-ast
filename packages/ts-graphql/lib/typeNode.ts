import * as graphql from '@nger/ast.graphql';
import * as tsc from '@nger/ast.tsc'
/**
 * 1. 扫描属性 (属性名 类型名 可选 默认值)
 * 2. 扫描方法 (属性名 参数 返回值)
 * 3. 扫描参数 (属性名 类型名 可选 默认)
 */
export class TypeNode {
    parent: TypeNode;
    children: TypeNode[] = [];
    type: graphql.TypeNode;
    node: tsc.TypeNode;

    createProperty() { }
    createInput() { }
    createType() { }
}