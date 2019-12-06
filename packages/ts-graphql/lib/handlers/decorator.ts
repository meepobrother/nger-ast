import { DecoratorVisitor } from '../interfaces/decorator';
import * as ast from '@nger/ast_ts';
import * as astTs from '@nger/ast_ts';
import * as ts from 'typescript';
import { CompilerContext } from '../compiler';
import * as graphql from '@nger/ast.graphql';
export class NestDecoratorVisitor implements DecoratorVisitor {
    interfaceTypeDefinitionNodeToObjectTypeDefinitionNode(node: graphql.InterfaceTypeDefinitionNode): graphql.ObjectTypeDefinitionNode {
        const nameValue = new graphql.NameNode(node.name.value + 'Result')
        const ast = new graphql.ObjectTypeDefinitionNode();
        ast.name = nameValue;
        ast.description = node.description;
        ast.directives = node.directives;
        if (node.fields) {
            ast.fields = node.fields.map(it => this.fieldDefinitionNodeToInputValueDefinitionNode(it)).filter(it => !!it) as any;
        }
        return ast;
    }
    interfaceTypeDefinitionNodeToInputObjectTypeDefinitionNode(node: graphql.InterfaceTypeDefinitionNode): graphql.InputObjectTypeDefinitionNode {
        const ast = new graphql.InputObjectTypeDefinitionNode();
        const nameValue = new graphql.NameNode(node.name.value + 'Input')
        ast.name = nameValue;
        ast.description = node.description;
        ast.directives = node.directives;
        if (node.fields) {
            ast.fields = node.fields.map(it => this.fieldDefinitionNodeToInputValueDefinitionNode(it)).filter(it => !!it) as any;
        }
        return ast;
    }
    uniqueByKey<T>(it: T[], fn: (a: T) => string): T[] {
        const items: Map<string, T> = new Map();
        it.filter(it => !!it).map(i => {
            items.set(fn(i), i)
        });
        const arrs: T[] = [];
        items.forEach(it => {
            it && arrs.push(it)
        });
        return arrs;
    }
    handlerType(type: ts.Type, visitor: ast.Visitor, context: CompilerContext) {
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
                        const field = this.handlerType(type.__type, visitor, context)
                        if (field) {
                            context.setStatements([field])
                        }
                        if (Array.isArray(ast.interfaces)) {
                            ast.interfaces.push(type)
                        }
                    })
                } else {

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
    Query(node: ast.MethodDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void {
        throw new Error("Method not implemented.");
    }
    Mutation(node: ast.MethodDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void {
        throw new Error("Method not implemented.");
    }
    Subscription(node: ast.MethodDeclaration, visitor: ast.Visitor, context: CompilerContext, decorator: graphql.DirectiveNode): void {
        throw new Error("Method not implemented.");
    }
    private getInterfaceParent(symbol: ast.InterfaceSymbol, visitor: ast.Visitor, context: CompilerContext) {
        let members: any[] = [];
        if (!symbol) {
            return;
        }
        if (symbol.declarations) {
            const node = symbol.declarations[0];
            if (ast) members = node.members;
            if (node.heritageClauses) {
                try {
                    const parents = node.heritageClauses
                        .map((it: any) => it.types)
                        .filter((it: any) => !!it)
                        .flat()
                        .map(it => {
                            return it.toJson(visitor, context)
                        })
                        .map(it => it.expression.__type.symbol)
                        .map(it => {
                            return context.create(it)
                        })
                        .map((it: any) => {
                            return this.getInterfaceParent(it, visitor, context)
                        })
                        .filter(it => !!it)
                        .flat();
                    members.unshift(...parents)
                } catch (e) { }
            }
        }
        return members.map(it => {
            if (it instanceof graphql.FieldDefinitionNode) {
                return it;
            }
            if (it instanceof astTs.PropertySignature) {
                const { questionToken } = it;
                const ast = new graphql.FieldDefinitionNode();
                ast.name = it.name.visit(visitor, context);
                const type = it.type && it.type.visit(visitor, context);
                if (type) {
                    ast.type = questionToken ? type : new graphql.NonNullTypeNode(type);
                    if (type.name) {
                        if (type.name.__type) {
                            this.handlerType(type.name.__type, visitor, context)
                        }
                    }
                    return ast;
                }
            }
            if (it instanceof astTs.MethodSignature) {
                const { questionToken } = it;
                const ast = new graphql.FieldDefinitionNode();
                ast.name = it.name.visit(visitor, context);
                ast.arguments = it.parameters.map(par => par.visit(visitor, context))
                const type = it.type && it.type.visit(visitor, context);
                if (type) {
                    ast.type = questionToken ? type : new graphql.NonNullTypeNode(type);
                    if (type.name) {
                        if (type.name.__type) {
                            this.handlerType(type.name.__type, visitor, context)
                        }
                    }
                    return ast;
                }
                return ast;
            }
        });
    }
    private fieldDefinitionNodeToInputValueDefinitionNode(node: graphql.FieldDefinitionNode): graphql.InputValueDefinitionNode | undefined {
        if (Array.isArray(node.arguments)) {
            return;
        }
        const ast = new graphql.InputValueDefinitionNode();
        ast.name = node.name;
        ast.description = node.description;
        ast.directives = node.directives;
        ast.type = node.type;
        return ast;
    }

    Interface(node: ast.InterfaceDeclaration, visitor: ast.Visitor, context: CompilerContext): graphql.InterfaceTypeDefinitionNode {
        const { members, name, typeParameters, heritageClauses, type, questionToken } = node.toJson(visitor, context);
        const ast = new graphql.InterfaceTypeDefinitionNode();
        ast.name = name;
        if (Array.isArray(heritageClauses)) {
            ast.interfaces = [];
            heritageClauses.map((it: any) => {
                if (it.token === ts.SyntaxKind.ExtendsKeyword) {
                    const types = it.types.map((type: any) => context.create(type.__type.symbol))
                    const args = types.filter((it: any) => !!it).map((type: any) => this.getInterfaceParent(type, visitor, context)).flat();
                    members.push(...args);
                }
            });
        }
        ast.fields = this.uniqueByKey(members, (it: graphql.FieldDefinitionNode) => it && it.name && it.name.value);
        return ast;
    }
    Enum(node: ast.EnumDeclaration, visitor: ast.Visitor, context: CompilerContext) {
        const { name, members } = node.toJson(visitor, context);
        const ast = new graphql.EnumTypeDefinitionNode();
        ast.name = name;
        ast.values = members;
        context.setStatements([ast])
    }
} 