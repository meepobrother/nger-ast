import { DecoratorVisitor } from '../interfaces/decorator';
import * as ast from '@nger/ast.tsc';
import * as astTs from '@nger/ast.tsc';
import * as ts from 'typescript';
import { CompilerContext } from '../compiler';
import * as graphql from '@nger/ast.graphql';
export class NestDecoratorVisitor implements DecoratorVisitor {
    private handlerType(type: ts.Type, visitor: ast.Visitor, context: CompilerContext) {
        const symbol = type.symbol || type.aliasSymbol;
        if (symbol) {
            const symbolAst = context.create(symbol);
            if (symbolAst && typeof symbolAst.visit === 'function') return symbolAst.visit(visitor, context);
        }
    }
    Module(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void {
        if (decorator.arguments) {
            decorator.arguments.forEach(it => {
                if (it instanceof graphql.ObjectValueNode) {
                    it.fields.forEach(field => {
                        if (field.name.value === "providers") {
                            const values = field.value;
                            if (Array.isArray(values)) {
                                values.map(value => {
                                    const { __type: type } = value;
                                    this.handlerType(type, visitor, context)
                                })
                            }
                        }
                    })
                }
            });
        }
    }
    Controller(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void {
        const { name, members, heritageClauses } = node.toJson(visitor, context)
        const ast = new graphql.ObjectTypeDefinitionNode();
        ast.name = name;
        ast.fields = members;
        if (heritageClauses) {
            ast.interfaces = [];
            heritageClauses.map((it: any) => {
                if (it.token === ts.SyntaxKind.ImplementsKeyword) {
                    it.types.map((type: any) => {
                        // const field = this.handlerType(type.__type, visitor, context)
                        // if (field) {
                        // context.setStatements([field])
                        // }
                        // if (Array.isArray(ast.interfaces)) {
                        // ast.interfaces.push(type)
                        // }
                    })
                } else {
                    // extends 要管啊
                }
            })
        }
        context.setStatements([ast])
    }
    Injectable(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void {
        throw new Error("Method not implemented.");
    }
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
        throw new Error("Method not implemented.");
    }
    Entity(node: ast.ClassDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void {
        throw new Error("Method not implemented.");
    }
} 