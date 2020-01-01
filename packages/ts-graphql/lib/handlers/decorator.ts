import { DecoratorVisitor } from '../interfaces/decorator';
import * as ast from '@nger/ast.tsc';
import * as ts from 'typescript';
import { CompilerContext } from '../compiler';
import * as graphql from '@nger/ast.graphql';
export class NestDecoratorVisitor implements DecoratorVisitor {
    NgModule(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void {
        return this.Module(node, visitor, context, decorator)
    }
    Module(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void {
        if (decorator.arguments) {
            decorator.arguments.forEach(it => {
                if (it instanceof graphql.ObjectValueNode) {
                    it.fields.forEach(field => {
                        if (field.name.value === "controllers" || field.name.value === "providers") {
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
    Resolver(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode) { }
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
            decorator.arguments.forEach(it => {
                if (it instanceof graphql.StringValueNode) {
                    scalar.name = new graphql.NameNode(it.value);
                }
            })
        }
        context.setStatements([scalar])
    }
    Magnus(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void {
        const { name, members, heritageClauses } = node.toJson(visitor, context)
        const ast = new graphql.ObjectTypeDefinitionNode();
        ast.name = name;
        ast.fields = members;
        if (heritageClauses) {
            ast.interfaces = [];
            heritageClauses.map((it: any) => {
                if (it.token === ts.SyntaxKind.ExtendsKeyword) {
                    debugger;
                }
            })
        }
    }
    Entity(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): any {
        return this.Class(node, visitor, context)
    }
    Class(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext) {
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
                return ast;
            }
        }
    }
}
