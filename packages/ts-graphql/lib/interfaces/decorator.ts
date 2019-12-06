import * as ast from '@nger/ast.tsc';
import { CompilerContext } from '../compiler';
import * as graphql from '@nger/ast.graphql'
import * as ts from 'typescript';
export interface DecoratorHandler {
    (node: any, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
}
export interface DecoratorVisitor {
    interfaceTypeDefinitionNodeToInputObjectTypeDefinitionNode(node: graphql.InterfaceTypeDefinitionNode): graphql.InputObjectTypeDefinitionNode;
    interfaceTypeDefinitionNodeToObjectTypeDefinitionNode(node: graphql.InterfaceTypeDefinitionNode): graphql.ObjectTypeDefinitionNode;
    handlerType(type: ts.Type, visitor: ast.Visitor, context: CompilerContext): void;
    // classes
    Module(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Controller(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Injectable(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Scalar(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Magnus(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Entity(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    // methods
    Query(node: ast.MethodDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Mutation(node: ast.MethodDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Subscription(node: ast.MethodDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    // properties

    // Interface
    Interface(node: ast.InterfaceDeclaration, visitor: ast.Visitor, context: CompilerContext): void;
    // enum
    Enum(node: ast.EnumDeclaration, visitor: ast.Visitor, context: CompilerContext): void;
}
