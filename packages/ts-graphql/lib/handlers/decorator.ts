import { DecoratorVisitor } from '../interfaces/decorator';
import * as ast from '@nger/ast_ts';
import { CompilerContext } from '../compiler';
export const nestDecoratorVisitor: DecoratorVisitor = {
    Module: (node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext) => { },
    Controller: (node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext) => { },
    Injectable: (node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext) => { },
    Scalar: (node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext) => { },
    Magnus: (node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext) => { },
    Entity: (node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext) => { },
    Query: (node: ast.MethodDeclaration, visitor: ast.Visitor, context: CompilerContext) => { },
    Mutation: (node: ast.MethodDeclaration, visitor: ast.Visitor, context: CompilerContext) => { },
    Subscription: (node: ast.MethodDeclaration, visitor: ast.Visitor, context: CompilerContext) => { },
};
