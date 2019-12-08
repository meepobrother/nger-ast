import * as ast from '@nger/ast.tsc';
import { CompilerContext } from '../compiler';
import * as graphql from '@nger/ast.graphql'
export interface DecoratorHandler {
    (node: any, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
}
export interface DecoratorVisitor {
    Module(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Resolver(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Controller(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Injectable(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Scalar(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Magnus(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Entity(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Class(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext): void;
}
