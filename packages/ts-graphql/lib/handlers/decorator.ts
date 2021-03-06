import * as ast from '@nger/ast.tsc';
import * as ts from 'typescript';
import { CompilerContext } from '../compiler';
import * as graphql from '@nger/ast.graphql';
export interface DecoratorHandler {
    (node: any, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
}
export interface DecoratorVisitor {
    Module(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    NgModule(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Resolver(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Controller(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Injectable(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Scalar(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Magnus(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Entity(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void;
    Class(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext): void;
}

export class NestDecoratorVisitor implements DecoratorVisitor {
    NgModule(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void {
        return this.Module(node, visitor, context, decorator)
    }
    Module(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void {
        if (decorator.arguments) {
            decorator.arguments.filter(it => !!it).forEach(it => {
                if (it instanceof graphql.ObjectValueNode) {
                    it.fields.filter(it => !!it).forEach(field => {
                        if (field.name.value === "controllers" || field.name.value === "providers") {
                            const values = field.value;
                            if (Array.isArray(values)) {
                                values.filter(it => !!it).map(value => {
                                    const { __type: type } = value;
                                    if (type) {
                                        const ast = context.create(type.aliasSymbol || type.symbol || type)
                                        if (ast) {
                                            ast.visit(visitor, context)
                                        }
                                    }
                                })
                            }
                        }
                        if (field.name.value === 'imports') {
                            const values = field.value;
                            if (Array.isArray(values)) {
                                values.map(value => {
                                    const { __type: type } = value;
                                    if (type) {
                                        const ast = context.create(type.aliasSymbol || type.symbol || type)
                                        if (ast) {
                                            ast.visit(visitor, context)
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            });
        }
    }
    Resolver(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode) {
        return this.Controller(node, visitor, context, decorator)
    }
    Controller(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void {
        const ast = new graphql.ObjectTypeDefinitionNode();
        if (node.name) {
            ast.name = node.name.visit(visitor, context);
        }
        if (node.members) {
            ast.fields = node.members.map(it => {
                return it.visit(visitor, context)
            });
        }
        if (node.heritageClauses) {
            const heritageClauses = node.heritageClauses.map(it => it.visit(visitor, context))
            ast.interfaces = [];
            heritageClauses.map((it: any) => {
                if (it.token === ts.SyntaxKind.ExtendsKeyword) {
                    debugger;
                }
            })
        }
    }
    Injectable(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void { }
    Scalar(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void {
        const scalar = new graphql.ScalarTypeDefinitionNode();
        if (decorator.arguments) {
            decorator.arguments.filter(it => !!it).forEach(it => {
                if (it instanceof graphql.ObjectValueNode) {
                    it.fields.map(it => {
                        if (it.name.value === 'name') {
                            if (it.value instanceof graphql.StringValueNode) {
                                scalar.name = new graphql.NameNode(it.value.value);
                            }
                        }
                    })
                }
                if (it instanceof graphql.StringValueNode) {
                    scalar.name = new graphql.NameNode(it.value);
                }
            })
        }
        context.setStatements(scalar)
    }
    Magnus(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void {
        return this.Controller(node, visitor, context, decorator)
    }
    Entity(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): any {
        return this.Class(node, visitor, context)
    }
    static classes: Map<any, any> = new Map()
    Class(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext) {
        if (NestDecoratorVisitor.classes.has(node.__node)) {
            return NestDecoratorVisitor.classes.get(node.__node)
        }
        const ast = new graphql.ObjectTypeDefinitionNode();
        if (node.name) {
            ast.name = node.name.visit(visitor, context);
        }
        if (node.members) {
            ast.fields = node.members.map(it => {
                return it.visit(visitor, context)
            });
        }
        if (node.heritageClauses) {
            const heritageClauses = node.heritageClauses.map(it => it.visit(visitor, context))
            ast.interfaces = [];
            heritageClauses.map((it: any) => {
                if (it.token === ts.SyntaxKind.ExtendsKeyword) {
                    // debugger;
                }
            })
        }
        if (ast.fields) {
            if (ast.fields.filter(it => !!it).length > 0) {
                NestDecoratorVisitor.classes.set(node.__node, ast)
                return ast;
            }
        }
    }
}
