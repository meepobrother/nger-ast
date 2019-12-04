import * as ast from '@nger/ast_ts';
import { CompilerContext } from '../compiler';
export interface DecoratorHandler {
    (node: any, visitor: ast.Visitor, context: CompilerContext): void;
}
export interface DecoratorVisitor {
    [key: string]: DecoratorHandler;
}
