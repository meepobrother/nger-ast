import * as graphql from '@nger/ast.graphql';
export const hasModuleDecorator = hasDecorator(`Module`)
export function hasDecorator(name: string) {
    return (decorators: graphql.DirectiveNode[]) => decorators.find(it => it.name.value === name)
}
