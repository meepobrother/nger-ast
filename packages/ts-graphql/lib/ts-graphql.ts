import * as ast from '@nger/ast.tsc';
import * as astTs from '@nger/ast.tsc';
import * as graphql from '@nger/ast.graphql';
import { CompilerContext } from './compiler';
import { join, dirname, extname } from 'path';
import * as ts from 'typescript';
import { existsSync } from 'fs';
import { DecoratorVisitor } from './interfaces/decorator';
import * as tsGraphqlAst from './ast';
import { createNameNode } from './handlers/util';
export class TsGraphqlContext {
    graphql: graphql.DocumentNode = new graphql.DocumentNode();
}
export class TsGraphqlVisitor implements ast.Visitor {
    constructor(public handler: DecoratorVisitor) { }
    visit(node?: ast.Node | undefined, context?: any): any {
        return node && node.visit(this, context)
    }
    visits(nodes?: ast.Node[] | undefined, context?: any) {
        return nodes ? nodes.map(it => this.visit(it, context)) : [];
    }
    visitFunctionScopedVariableSymbol(node: ast.FunctionScopedVariableSymbol, context?: any) {
    }
    visitBlockScopedVariableSymbol(node: ast.BlockScopedVariableSymbol, context?: any) {
    }
    visitPropertySymbol(node: ast.PropertySymbol, context?: any): any {
        const { valueDeclaration, name, escapedName, flags } = node;
        if (valueDeclaration) {
            return node.valueDeclaration.visit(this, context)
        }
    }
    visitEnumMemberSymbol(node: ast.EnumMemberSymbol, context?: any) {
    }
    visitFunctionSymbol(node: ast.FunctionSymbol, context?: any): any {
        const { declarations, name, id, flags, valueDeclaration } = node;
        if (valueDeclaration) {
            return valueDeclaration.visit(this, context)
        }
        if (declarations && declarations.length > 0) {
            return declarations[0].visit(this, context)
        }
    }
    visitClassSymbol(node: ast.ClassSymbol, context?: any): any {
        const { declarations, name, id, flags, members, valueDeclaration } = node;
        if (valueDeclaration) {
            return valueDeclaration.visit(this, context)
        }
        if (declarations && declarations.length > 0) {
            return declarations[0].visit(this, context)
        }
    }
    handlerType(type: ts.Type, visitor: ast.Visitor, context: CompilerContext) {
        const symbol = (type as any).declaredType || type.symbol || type.aliasSymbol;
        if (symbol) {
            const symbolAst = context.create(symbol);
            if (symbolAst && typeof symbolAst.visit === 'function') return symbolAst.visit(visitor, context);
        }
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
    private fieldDefinitionNodeToInputValueDefinitionNode(node: graphql.FieldDefinitionNode, context: CompilerContext): graphql.InputValueDefinitionNode | undefined {
        if (Array.isArray(node.arguments)) {
            return;
        }
        const ast = new graphql.InputValueDefinitionNode();
        ast.name = node.name;
        ast.description = node.description;
        ast.directives = node.directives;
        // 转input
        const type = node;
        ast.type = node.type;
        if (type.name) {
            if (type.name.__type) {
                const res = this.handlerType(type.name.__type, this, context)
                if (res) {
                    if (res instanceof graphql.InterfaceTypeDefinitionNode) {
                        const obj = this.interfaceTypeDefinitionNodeToInputObjectTypeDefinitionNode(res, context)
                        if (obj) {
                            context.setStatements([obj]);
                            if (node.type instanceof graphql.NonNullTypeNode) {
                                const type = new graphql.NonNullTypeNode();
                                const named = new graphql.NamedTypeNode()
                                named.name = obj.name;
                                type.type = named;
                                ast.type = type;
                            }
                            if (node.type instanceof graphql.ListTypeNode) {
                                const type = new graphql.ListTypeNode();
                                const named = new graphql.NamedTypeNode()
                                named.name = obj.name;
                                type.type = named;
                                ast.type = type;
                            }
                            if (node.type instanceof graphql.NamedTypeNode) {
                                const type = new graphql.NamedTypeNode()
                                type.name = obj.name;
                                ast.type = type;
                            }
                        }
                    }
                }
            }
        }
        return ast;
    }
    private fieldDefinitionNodeToFieldDefinitionNode(node: graphql.FieldDefinitionNode, context: CompilerContext): graphql.FieldDefinitionNode | undefined {
        if (Array.isArray(node.arguments)) {
            return;
        }
        const ast = new graphql.FieldDefinitionNode();
        ast.name = node.name;
        ast.description = node.description;
        ast.directives = node.directives;
        // 转input
        const type = node;
        ast.type = node.type;
        if (type.name) {
            if (type.name.__type) {
                const res = this.handlerType(type.name.__type, this, context)
                if (res) {
                    if (res instanceof graphql.InterfaceTypeDefinitionNode) {
                        const obj = this.interfaceTypeDefinitionNodeToObjectTypeDefinitionNode(res, context)
                        if (obj) {
                            context.setStatements([obj]);
                            if (node.type instanceof graphql.NonNullTypeNode) {
                                const type = new graphql.NonNullTypeNode();
                                const named = new graphql.NamedTypeNode()
                                named.name = obj.name;
                                type.type = named;
                                ast.type = type;
                            }
                            if (node.type instanceof graphql.ListTypeNode) {
                                const type = new graphql.ListTypeNode();
                                const named = new graphql.NamedTypeNode()
                                named.name = obj.name;
                                type.type = named;
                                ast.type = type;
                            }
                            if (node.type instanceof graphql.NamedTypeNode) {
                                const type = new graphql.NamedTypeNode()
                                type.name = obj.name;
                                ast.type = type;
                            }
                        }
                    }
                }
            }
        }
        return ast;
    }
    interfaceTypeDefinitionNodeToObjectTypeDefinitionNode(node: graphql.InterfaceTypeDefinitionNode, context: CompilerContext): graphql.ObjectTypeDefinitionNode {
        const nameValue = new graphql.NameNode(node.name.value)
        const ast = new graphql.ObjectTypeDefinitionNode();
        ast.name = nameValue;
        ast.description = node.description;
        ast.directives = node.directives;
        if (node.fields) {
            ast.fields = node.fields.map(it => this.fieldDefinitionNodeToFieldDefinitionNode(it, context)).filter(it => !!it) as any;
        }
        return ast;
    }
    interfaceTypeDefinitionNodeToInputObjectTypeDefinitionNode(node: graphql.InterfaceTypeDefinitionNode, context: CompilerContext): graphql.InputObjectTypeDefinitionNode {
        const ast = new graphql.InputObjectTypeDefinitionNode();
        const nameValue = new graphql.NameNode(node.name.value + 'Input')
        ast.name = nameValue;
        ast.description = node.description;
        ast.directives = node.directives;
        if (node.fields) {
            ast.fields = node.fields.map(it => this.fieldDefinitionNodeToInputValueDefinitionNode(it, context)).filter(it => !!it) as any;
        }
        return ast;
    }
    visitInterfaceSymbol(node: ast.InterfaceSymbol, context: CompilerContext): any {
        const { declarations } = node;
        if (declarations.length > 0) {
            return declarations[0].visit(this, context)
        }
    }
    visitConstEnumSymbol(node: ast.ConstEnumSymbol, context?: any) {
    }
    visitRegularEnumSymbol(node: ast.RegularEnumSymbol, context?: any): any {
        const { valueDeclaration } = node;
        return valueDeclaration.visit(this, context)
    }
    visitValueModuleSymbol(node: ast.ValueModuleSymbol, context?: any) {
    }
    visitNamespaceModuleSymbol(node: ast.NamespaceModuleSymbol, context?: any) {
    }
    visitTypeLiteralSymbol(node: ast.TypeLiteralSymbol, context?: any) {
    }
    visitObjectLiteralSymbol(node: ast.ObjectLiteralSymbol, context?: any) {
    }
    visitMethodSymbol(node: ast.MethodSymbol, context?: any): any {
        const { valueDeclaration } = node;
        return valueDeclaration.visit(this, context)
    }
    visitConstructorSymbol(node: ast.ConstructorSymbol, context?: any) {
    }
    visitGetAccessorSymbol(node: ast.GetAccessorSymbol, context?: any) {
    }
    visitSetAccessorSymbol(node: ast.SetAccessorSymbol, context?: any) {
    }
    visitSignatureSymbol(node: ast.SignatureSymbol, context?: any) {
        const { name } = node;
        return name;
    }
    visitTypeParameterSymbol(node: ast.TypeParameterSymbol, context?: any): any {
        const { name, declarations, id } = node;
        if (declarations && declarations.length > 0) {
            const ast = declarations[0].visit(this, context);
            ast.id = id;
            return ast;
        }
        return name;
    }
    visitTypeAliasSymbol(node: ast.TypeAliasSymbol, context: CompilerContext): any {
        const { name, declarations } = node;
        if (declarations && declarations.length > 0) {
            return declarations[0].visit(this, context)
        }
    }
    visitExportValueSymbol(node: ast.ExportValueSymbol, context?: any) {
    }
    visitAliasSymbol(node: ast.AliasSymbol, context?: any) {
    }
    visitPrototypeSymbol(node: ast.PrototypeSymbol, context?: any) {
    }
    visitOptionalSymbol(node: ast.OptionalSymbol, context?: any) {
    }
    visitTransientSymbol(node: ast.TransientSymbol, context?: any) {
    }
    visitAssignmentSymbol(node: ast.AssignmentSymbol, context?: any) {
    }
    visitModuleExportsSymbol(node: ast.ModuleExportsSymbol, context?: any) {
    }
    visitEnumSymbol(node: ast.EnumSymbol, context?: any) {
    }
    visitVariableSymbol(node: ast.VariableSymbol, context?: any) {
    }
    visitValueSymbol(node: ast.ValueSymbol, context?: any) {
    }
    visitTypeSymbol(node: ast.TypeSymbol, context?: any) {
    }
    visitNamespaceSymbol(node: ast.NamespaceSymbol, context?: any) {
    }
    visitModuleSymbol(node: ast.ModuleSymbol, context?: any) {
    }
    visitAccessorSymbol(node: ast.AccessorSymbol, context?: any) {
    }
    visitFunctionScopedVariableExcludesSymbol(node: ast.FunctionScopedVariableExcludesSymbol, context?: any) {
    }
    visitBlockScopedVariableExcludesSymbol(node: ast.BlockScopedVariableExcludesSymbol, context?: any) {
    }
    visitParameterExcludesSymbol(node: ast.ParameterExcludesSymbol, context?: any) {
    }
    visitEnumMemberExcludesSymbol(node: ast.EnumMemberExcludesSymbol, context?: any) {
    }
    visitFunctionExcludesSymbol(node: ast.FunctionExcludesSymbol, context?: any) {
    }
    visitClassExcludesSymbol(node: ast.ClassExcludesSymbol, context?: any) {
    }
    visitInterfaceExcludesSymbol(node: ast.InterfaceExcludesSymbol, context?: any) {
    }
    visitRegularEnumExcludesSymbol(node: ast.RegularEnumExcludesSymbol, context?: any) {
    }
    visitConstEnumExcludesSymbol(node: ast.ConstEnumExcludesSymbol, context?: any) {
    }
    visitValueModuleExcludesSymbol(node: ast.ValueModuleExcludesSymbol, context?: any) {
    }
    visitMethodExcludesSymbol(node: ast.MethodExcludesSymbol, context?: any) {
    }
    visitGetAccessorExcludesSymbol(node: ast.GetAccessorExcludesSymbol, context?: any) {
    }
    visitSetAccessorExcludesSymbol(node: ast.SetAccessorExcludesSymbol, context?: any) {
    }
    visitTypeParameterExcludesSymbol(node: ast.TypeParameterExcludesSymbol, context?: any) {
    }
    visitTypeAliasExcludesSymbol(node: ast.TypeAliasExcludesSymbol, context?: any) {
    }
    visitAliasExcludesSymbol(node: ast.AliasExcludesSymbol, context?: any) {
    }
    visitModuleMemberSymbol(node: ast.ModuleMemberSymbol, context?: any) {
    }
    visitExportHasLocalSymbol(node: ast.ExportHasLocalSymbol, context?: any) {
    }
    visitBlockScopedSymbol(node: ast.BlockScopedSymbol, context?: any) {
    }
    visitPropertyOrAccessorSymbol(node: ast.PropertyOrAccessorSymbol, context?: any) {
    }
    visitClassMemberSymbol(node: ast.ClassMemberSymbol, context?: any) {
    }

    visitRegularExpressionLiteral(node: ast.RegularExpressionLiteral, context: any) {
    }

    visitModifier(node: ast.Modifier, context?: any) {
        const { kind } = node;
        switch (kind) {
            case ts.SyntaxKind.AbstractKeyword:
                return `abstract`
            case ts.SyntaxKind.AsyncKeyword:
                return `async`
            case ts.SyntaxKind.ConstKeyword:
                return `const`
            case ts.SyntaxKind.DeclareKeyword:
                return `declare`
            case ts.SyntaxKind.DefaultKeyword:
                return `default`
            case ts.SyntaxKind.ExportKeyword:
                return `export`
            case ts.SyntaxKind.PublicKeyword:
                return `public`
            case ts.SyntaxKind.PrivateKeyword:
                return `private`
            case ts.SyntaxKind.ProtectedKeyword:
                return `protected`
            case ts.SyntaxKind.ReadonlyKeyword:
                return `readonly`
            case ts.SyntaxKind.StaticKeyword:
                return `static`
        }
        return;
    }
    visitJSDocThisTag(node: ast.JSDocThisTag, context?: any) {
    }
    visitJSDocTypeTag(node: ast.JSDocTypeTag, context?: any) {
    }
    visitJSDocUnknownTag(node: ast.JSDocUnknownTag, context?: any) {
    }
    visitJSDocAugmentsTag(node: ast.JSDocAugmentsTag, context?: any) {
    }
    visitJSDocAuthorTag(node: ast.JSDocAuthorTag, context?: any) {
    }
    visitJSDocClassTag(node: ast.JSDocClassTag, context?: any) {
    }
    visitJSDocEnumTag(node: ast.JSDocEnumTag, context?: any) {
    }

    visitSetAccessorDeclaration(node: ast.SetAccessorDeclaration, context?: any) {
    }
    isInput: boolean;
    visitMethodDeclaration(node: ast.MethodDeclaration, context: CompilerContext) {
        const { questionToken, asteriskToken } = node;
        if (node.modifiers) {
            const modifiers = node.modifiers.map(it => it.visit(this, context))
            if (['private', 'protected', 'static'].some(it => modifiers.includes(it))) {
                return;
            }
        }
        if (node.decorators) {
            const decorators = this.visits(node.decorators, context);
            const needDecorators = ['Query', 'Mutation', 'Subscription'];
            let _current: any;
            const needCreate = decorators && decorators.find((it: any) => {
                if (needDecorators.includes(it.name.value)) {
                    _current = it.name.value;
                    return true;
                }
                return false;
            })
            if (needCreate && _current) {
                const ast = new graphql.FieldDefinitionNode()
                if (node.name) {
                    ast.name = node.name.visit(this, context)
                    const { arguments: args } = needCreate;
                    if (args && args.length > 0) {
                        if (args[0] instanceof graphql.StringValueNode) {
                            ast.name = createNameNode(args[0].value)
                        }
                    }
                }
                if (node.parameters) {
                    ast.arguments = node.parameters.map(it => {
                        this.isInput = true;
                        return it.visit(this, context)
                    });
                    this.isInput = false;
                }
                if (node.type) {
                    const type = node.type.visit(this, context)
                    if (type instanceof tsGraphqlAst.TypeNode) {
                        const typeNode = type.getType();
                        if (typeNode) ast.type = questionToken ? typeNode : new graphql.NonNullTypeNode(typeNode);
                    }
                } else {
                    if (!ast.type) {
                        const sourceFile = node.__node.getSourceFile();
                        const filename = sourceFile.fileName;
                        console.error(`missing type definition! \n${filename}:${ts.getLineAndCharacterOfPosition(sourceFile, node.__node.end).line}\n${node.__node.getText()}\n\n`)
                    }
                }
                if (node.jsDoc) {
                    const jsDoc = node.jsDoc.map(it => it.visit(this, context)).flat();
                    ast.description = this.mergeJsDoc(jsDoc);
                }
                if (_current === 'Query') {
                    context.addQuery(ast);
                } else if (_current === 'Mutation') {
                    context.addMutation(ast)
                } else if (_current === 'Subscription') {
                    context.addSubscription(ast);
                } else {
                    return ast;
                }
            }
        }
    }
    mergeJsDoc(jsDoc: graphql.StringValueNode[]) {
        const val = jsDoc.filter(it => it instanceof graphql.StringValueNode).map(it => it.value).join(`\n`);
        const ast = new graphql.StringValueNode(val)
        ast.value = ast.value || '';
        ast.block = true;
        return ast;
    }
    visitTaggedTemplateExpression(node: ast.TaggedTemplateExpression, context?: any) {
    }
    visitJsxText(node: ast.JsxText, context?: any) {

    }
    visitSpreadAssignment(node: ast.SpreadAssignment, context?: any) {

    }
    visitPropertyAssignment(node: ast.PropertyAssignment, context?: any) {
        const { name, questionToken, initializer } = node.toJson(this, context);
        const file = new graphql.ObjectFieldNode();
        file.name = name;
        file.value = initializer;
        return file;
    }
    visitShorthandPropertyAssignment(node: ast.ShorthandPropertyAssignment, context?: any) {

    }
    visitEmptyStatement(node: ast.EmptyStatement, context?: any) {

    }
    visitJsxTagNamePropertyAccess(node: ast.JsxTagNamePropertyAccess, context?: any) {

    }
    visitIfStatement(node: ast.IfStatement, context?: any) {

    }
    visitDebuggerStatement(node: ast.DebuggerStatement, context?: any) {

    }
    visitNotEmittedStatement(node: ast.NotEmittedStatement, context?: any) {

    }
    visitDefaultClause(node: ast.DefaultClause, context?: any) {

    }
    visitNamespaceDeclaration(node: ast.NamespaceDeclaration, context?: any) {

    }
    visitNamedImports(node: ast.NamedImports, context?: any) {
        const { elements } = node.toJson(this, context);
        return elements;
    }
    visitImportSpecifier(node: ast.ImportSpecifier, context: CompilerContext) {
        const { propertyName, name } = node.toJson(this, context);
        return propertyName ? propertyName : name;
    }
    visitNamespaceImport(node: ast.NamespaceImport, context?: any) {

    }
    visitCaseClause(node: ast.CaseClause, context?: any) {

    }
    visitComputedPropertyName(node: ast.ComputedPropertyName, context?: any) {
        const { } = node;
    }
    visitObjectBindingPattern(node: ast.ObjectBindingPattern, context?: any) {

    }
    visitArrayBindingPattern(node: ast.ArrayBindingPattern, context?: any) {

    }
    visitParameterDeclaration(node: ast.ParameterDeclaration, context?: any) {
        let { dotDotDotToken, name, questionToken, type, initializer } = node.toJson(this, context);
        const input = new graphql.InputValueDefinitionNode();
        input.name = name;
        if (type instanceof tsGraphqlAst.TypeNode) {
            const typeNode = type.getType();
            if (typeNode) input.type = questionToken ? typeNode : new graphql.NonNullTypeNode(typeNode);
        }
        if (dotDotDotToken) {
            // throw new Error(`method parameter not support ...`)
        }
        return input;
    }
    visitBindingElement(node: ast.BindingElement, context?: any) {

    }
    visitVariableDeclarationList(node: ast.VariableDeclarationList, context?: any) {
        const { declarations } = node.toJson(this, context);
        return declarations;
    }
    visitVariableStatement(node: ast.VariableStatement, context?: any) {
        const { declarationList } = node.toJson(this, context);
        return declarationList;
    }
    visitVariableDeclaration(node: ast.VariableDeclaration, context?: any) {
    }
    visitDoStatement(node: ast.DoStatement, context?: any) { }
    visitWhileStatement(node: ast.WhileStatement, context?: any) {
    }
    visitForStatement(node: ast.ForStatement, context?: any) {
    }
    visitForInStatement(node: ast.ForInStatement, context?: any) {
    }
    visitForOfStatement(node: ast.ForOfStatement, context?: any) {
    }
    visitBreakStatement(node: ast.BreakStatement, context?: any) {
    }
    visitContinueStatement(node: ast.ContinueStatement, context?: any) {
    }
    visitReturnStatement(node: ast.ReturnStatement, context?: any) {
        const { expression } = node.toJson(this, context);
        return expression;
    }
    visitWithStatement(node: ast.WithStatement, context?: any) {
    }
    visitLabeledStatement(node: ast.LabeledStatement, context?: any) {
    }
    visitCaseBlock(node: ast.CaseBlock, context?: any) {

    }
    visitSwitchStatement(node: ast.SwitchStatement, context?: any) {

    }
    visitThrowStatement(node: ast.ThrowStatement, context?: any) {

    }
    visitCatchClause(node: ast.CatchClause, context?: any) {

    }
    visitTryStatement(node: ast.TryStatement, context?: any) {

    }
    visitImportClause(node: ast.ImportClause, context?: CompilerContext) {
        const { name, namedBindings } = node.toJson(this, context);
        return name ? name : namedBindings;
    }
    private transformPath(path: string, context: CompilerContext) {
        if (path.startsWith('/')) {
            path = path;
        } else if (path.startsWith('.')) {
            path = join(dirname(context.sourceFile.fileName), path)
        } else {
            path = require.resolve(path)
        }
        const ext = extname(path)
        if (ext === '.js') {
            // path = path.replace('.js', '.d.ts')
        } else {
            if (existsSync(`${path}.d.ts`)) {
                // path = `${path}.d.ts`
            } else if (existsSync(`${path}.ts`)) {
                path = `${path}.ts`
            } else if (existsSync(`${path}/index.d.ts`)) {
                // path = `${path}/index.d.ts`
            } else if (existsSync(`${path}/index.ts`)) {
                path = `${path}/index.ts`
            } else {
                return path;
            }
        }
        return path;
    }
    visitImportDeclaration(node: ast.ImportDeclaration, context: CompilerContext) {
        const { moduleSpecifier, importClause } = node.toJson(this, context);
        // const sourceFile = context.getSourceFile(this.transformPath(moduleSpecifier.value, context));
        // if (sourceFile) {
        //     const ctx = new CompilerContext(context)
        //     this.visitSourceFile(sourceFile, ctx)
        //     context.addChildren(moduleSpecifier.value, ctx)
        // };
    }
    visitModuleBlock(node: ast.ModuleBlock, context?: any) {

    }
    visitJSDocNamespaceDeclaration(node: ast.JSDocNamespaceDeclaration, context?: any) {

    }
    visitJsxSpreadAttribute(node: ast.JsxSpreadAttribute, context?: any) {

    }
    visitStringLiteral(node: ast.StringLiteral, context?: any) {
        return new graphql.StringValueNode(node.text)
    }
    visitJsxAttribute(node: ast.JsxAttribute, context?: any) {

    }
    visitObjectLiteralExpression(node: ast.ObjectLiteralExpression, context?: any) {
        const { properties } = node.toJson(this, context);
        const obj = new graphql.ObjectValueNode();
        obj.fields = properties;
        return obj;
    }
    visitJsxAttributes(node: ast.JsxAttributes, context?: any) {

    }
    visitJsxOpeningFragment(node: ast.JsxOpeningFragment, context?: any) {

    }
    visitJsxClosingFragment(node: ast.JsxClosingFragment, context?: any) {

    }
    visitJsxFragment(node: ast.JsxFragment, context?: any) {

    }
    visitJsxSelfClosingElement(node: ast.JsxSelfClosingElement, context?: any) {

    }
    visitJsxOpeningElement(node: ast.JsxOpeningElement, context?: any) {

    }
    visitJsxClosingElement(node: ast.JsxClosingElement, context?: any) {

    }
    visitJsxElement(node: ast.JsxElement, context?: any) {

    }
    visitMetaProperty(node: ast.MetaProperty, context?: any) {

    }
    visitArrayLiteralExpression(node: ast.ArrayLiteralExpression, context?: any) {
        const { elements } = node.toJson(this, context);
        return elements;
    }
    visitParenthesizedExpression(node: ast.ParenthesizedExpression, context?: any) {

    }
    visitTemplateHead(node: ast.TemplateHead, context?: any) {

    }
    visitTemplateExpression(node: ast.TemplateExpression, context?: any) {

    }
    visitTemplateSpan(node: ast.TemplateSpan, context?: any) {

    }
    visitTemplateMiddle(node: ast.TemplateMiddle, context?: any) {

    }
    visitFunctionExpression(node: ast.FunctionExpression, context?: any) {

    }
    visitTemplateTail(node: ast.TemplateTail, context?: any) {

    }
    visitThisExpression(node: ast.ThisExpression, context?: any) {

    }
    visitSuperExpression(node: ast.SuperExpression, context?: any) {

    }
    visitImportExpression(node: ast.ImportExpression, context?: any) {

    }
    visitNullLiteral(node: ast.NullLiteral, context?: any) {
        return new graphql.NullValueNode()
    }
    visitBooleanLiteral(node: ast.BooleanLiteral, context?: any) {
        const ast = new graphql.BooleanValueNode();
        if (node.isTrue()) {
            ast.value = true;
        } else {
            ast.value = false;
        }
        return ast;
    }
    visitPartiallyEmittedExpression(node: ast.PartiallyEmittedExpression, context?: any) {

    }
    visitNonNullExpression(node: ast.NonNullExpression, context?: any) {

    }
    visitPostfixUnaryExpression(node: ast.PostfixUnaryExpression, context?: any) {

    }
    visitPrefixUnaryExpression(node: ast.PrefixUnaryExpression, context?: any) {

    }
    visitDeleteExpression(node: ast.DeleteExpression, context?: any) {

    }
    visitTypeOfExpression(node: ast.TypeOfExpression, context?: any) {

    }
    visitVoidExpression(node: ast.VoidExpression, context?: any) {

    }
    visitAwaitExpression(node: ast.AwaitExpression, context?: any) {
        const { expression } = node.toJson(this, context);
        return expression;
    }
    visitTypeAssertion(node: ast.TypeAssertion, context?: any) {

    }
    visitCommaListExpression(node: ast.CommaListExpression, context?: any) {

    }
    visitJsxExpression(node: ast.JsxExpression, context?: any) {

    }
    visitAsExpression(node: ast.AsExpression, context?: any) {

    }
    visitNewExpression(node: ast.NewExpression, context?: any) {

    }
    visitSpreadElement(node: ast.SpreadElement, context?: any) {

    }
    visitConditionalExpression(node: ast.ConditionalExpression, context?: any) {

    }
    visitElementAccessExpression(node: ast.ElementAccessExpression, context?: any) {

    }
    visitOmittedExpression(node: ast.OmittedExpression, context?: any) {

    }
    visitYieldExpression(node: ast.YieldExpression, context?: any) {

    }
    visitSyntheticExpression(node: ast.SyntheticExpression, context?: any) {

    }
    visitPropertyAccessExpression(node: ast.PropertyAccessExpression, context?: any) {

    }
    visitBigIntLiteral(node: ast.BigIntLiteral, context?: any) {
        const ast = new graphql.StringValueNode()
        ast.value = node.text;
        return ast;
    }
    visitNumericLiteral(node: ast.NumericLiteral, context?: any) {
        const ast = new graphql.IntValueNode()
        ast.value = node.text;
        return ast;
    }
    visitSemicolonClassElement(node: ast.SemicolonClassElement, context?: any) {

    }
    visitHeritageClause(node: ast.HeritageClause, context?: any) {
        const { token, types } = node.toJson(this, context);
        return { token, types };
    }
    visitExpressionWithTypeArguments(node: ast.ExpressionWithTypeArguments, context?: any) {
        const { expression } = node.toJson(this, context);
        return expression;
    }

    visitTypeParameterDeclaration(node: ast.TypeParameterDeclaration, context?: any) {
        const { name, constraint, default: _def, expression, type } = node.toJson(this, context);
        const ast = new graphql.TypeParameter()
        ast.name = name;
        ast.default = _def;
        ast.constraint = constraint;
        ast.expression = expression;
        ast.type = type;
        return ast;
    }

    visitExternalModuleReference(node: ast.ExternalModuleReference, context?: any) {

    }
    visitNamedExports(node: ast.NamedExports, context?: any) {
        const { elements } = node.toJson(this, context);
        return elements;
    }
    visitExportDeclaration(node: ast.ExportDeclaration, context: CompilerContext) {
        const { exportClause, moduleSpecifier } = node.toJson(this, context);
    }
    visitExportSpecifier(node: ast.ExportSpecifier, context: CompilerContext) {
        const exp = context.typeChecker.getExportSpecifierLocalTargetSymbol(node.__node as any)
        const { name, propertyName } = node.toJson(this, context);
        let astName = propertyName ? propertyName : name;
        return {
            name: astName,
            exp
        }
    }
    visitEndOfFileToken(node: ast.EndOfFileToken, context?: any) {

    }
    visitEnumMember(node: ast.EnumMember, context?: any) {
        const { name, initializer } = node.toJson(this, context);
        const ast = new graphql.EnumValueDefinitionNode();
        ast.name = name;
        return ast;
    }
    visitModuleDeclaration(node: ast.ModuleDeclaration, context?: any) {

    }
    visitImportEqualsDeclaration(node: ast.ImportEqualsDeclaration, context?: any) {

    }
    visitFunctionDeclaration(node: ast.FunctionDeclaration, context?: any) {
        if (node.body) {
            node.body.visit(this, context)
        }
        return;
    }

    visitIndexSignatureDeclaration(node: ast.IndexSignatureDeclaration, context?: any) {
        const { parameters, type, name, locals, questionToken, modifiers, typeParameters } = node.toJson(this, context);
        debugger;
    }
    visitMethodSignature(node: ast.MethodSignature, context?: any) {
        const { name, type, parameters, typeParameters, questionToken } = node.toJson(this, context);
    }
    visitConstructSignatureDeclaration(node: ast.ConstructSignatureDeclaration, context?: any) {
        const { } = node;
    }
    visitCallSignatureDeclaration(node: ast.CallSignatureDeclaration, context?: any) {
    }
    visitArrowFunction(node: ast.ArrowFunction, context?: any) {
        return () => { };
    }

    visitEnumDeclaration(node: ast.EnumDeclaration, context: CompilerContext): any {
        const { name, members } = node.toJson(this, context);
        const ast = new graphql.EnumTypeDefinitionNode();
        ast.name = name;
        ast.values = members;
        context.setStatements([ast])
        return ast;
    }
    visitPropertyAccessEntityNameExpression(node: ast.PropertyAccessEntityNameExpression, context: CompilerContext) {
        const { expression, name } = node.toJson(this, context);
        return name ? name : expression;
    }
    visitJSDocSignature(node: ast.JSDocSignature, context: CompilerContext) {

    }
    visitJSDocCallbackTag(node: ast.JSDocCallbackTag, context: CompilerContext) {

    }

    visitJSDocTemplateTag(node: ast.JSDocTemplateTag, context: CompilerContext) {

    }
    visitJSDocParameterTag(node: ast.JSDocParameterTag, context: CompilerContext) {
        const { name, typeExpression, comment, tagName, isBracketed, isNameFirst } = node.toJson(this, context);
        const ast = new graphql.NamedTypeNode();
        ast.name = typeExpression;
        ast.description = new graphql.StringValueNode(comment);
        return ast;
    }
    visitJSDocReturnTag(node: ast.JSDocReturnTag, context: CompilerContext) {
        const { typeExpression, tagName, comment } = node.toJson(this, context);
        const ast = new graphql.NamedTypeNode();
        ast.name = new graphql.NameNode(comment);
        if (tagName) ast.description = new graphql.StringValueNode(tagName);
        return ast;
    }
    visitClassExpression(node: ast.ClassExpression, context?: any) {

    }
    private serializeSymbol(symbol: ts.Symbol, context: CompilerContext): any {
        return {
            name: symbol.getName(),
            documentation: ts.displayPartsToString(symbol.getDocumentationComment(context.typeChecker)),
            type: context.typeChecker.typeToString(
                context.typeChecker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!)
            )
        };
    }
    serializeSignature(signature: ts.Signature, context: CompilerContext) {
        return {
            parameters: signature.parameters.map((it) => this.serializeSymbol(it, context)),
            returnType: context.typeChecker.typeToString(signature.getReturnType()),
            documentation: ts.displayPartsToString(signature.getDocumentationComment(context.typeChecker))
        };
    }
    visitDecorator(node: ast.Decorator, context: CompilerContext) {
        const { expression } = node.toJson(this, context);
        const directive = new graphql.DirectiveNode();
        directive.arguments = expression.args;
        directive.name = expression.expression;
        return directive;
    }
    visitJSDoc(node: ast.JSDoc, context?: any) {
        const { tags, comment } = node.toJson(this, context);
        const ast = new graphql.StringValueNode(comment);
        return [...(tags || []), ast].flat();
    }
    visitJSDocTypeLiteral(node: ast.JSDocTypeLiteral, context?: any) {

    }
    visitJSDocPropertyTag(node: ast.JSDocPropertyTag, context?: any) {

    }
    visitJSDocTypedefTag(node: ast.JSDocTypedefTag, context?: any) {

    }

    visitPropertySignature(node: ast.PropertySignature, context: CompilerContext) {
        const { name, type, questionToken, initializer, jsDoc } = node.toJson(this, context);
        const ast = new graphql.FieldDefinitionNode();
        ast.name = name;
        ast.type = questionToken ? type : new graphql.NonNullTypeNode(
            type
        );
        if (type instanceof tsGraphqlAst.TypeNode) {
            let typeNode = type.getType();
            ast.type = questionToken ? typeNode as any : new graphql.NonNullTypeNode(
                typeNode
            );
            if (jsDoc) ast.description = this.mergeJsDoc(jsDoc.flat());
            return ast;
        }
        return ast;
    }
    uniqueByKey<T>(it: T[], fn: (a: T) => string): T[] {
        const items: Map<string, T> = new Map();
        it.filter(it => !!it).map(i => {
            if (fn(i)) {
                items.set(fn(i), i)
            }
        });
        const arrs: T[] = [];
        items.forEach(it => {
            it && arrs.push(it)
        });
        return arrs;
    }
    visitInterfaceDeclaration(node: ast.InterfaceDeclaration, context: CompilerContext): any {
        let { members, name, typeParameters, heritageClauses, jsDoc, type, questionToken } = node.toJson(this, context);
        const ast = new graphql.ObjectTypeDefinitionNode();
        ast.name = name;
        if (jsDoc) {
            ast.description = this.mergeJsDoc(jsDoc.flat())
        }
        if (Array.isArray(heritageClauses)) {
            ast.interfaces = [];
            heritageClauses.map((it: any) => {
                if (it.token === ts.SyntaxKind.ExtendsKeyword) {
                    const types = it.types.map((type: any) => context.create(type.__type.symbol))
                    const args = types.filter((it: any) => !!it).map((type: any) => this.getInterfaceParent(type, this, context)).flat();
                    members.push(...args);
                }
            });
        }
        ast.fields = this.uniqueByKey(members, (it: graphql.FieldDefinitionNode) => it && it.name && it.name.value);
        ast.typeParameters = typeParameters;
        return ast;
    }

    visitNoSubstitutionTemplateLiteral(node: ast.NoSubstitutionTemplateLiteral, context?: any) {
        const { text, rawText } = node;
        return new graphql.StringValueNode(rawText ? rawText : text);
    }
    visitGetAccessorDeclaration(node: ast.GetAccessorDeclaration, context?: any) {

    }

    visitSourceFile(node: ast.SourceFile, context: CompilerContext) {
        context.setSourceFile(node);
        node.statements.filter(it => {
            if (it instanceof ast.ExpressionStatement) {
                it.visit(this, context)
            }
        });
    }
    visitClassDeclaration(node: ast.ClassDeclaration, context?: any): any {
        if (Array.isArray(node.decorators)) {
            const decorators = node.decorators.map(dec => dec.visit(this, context))
            let ast: any;
            decorators && decorators.map((decorator: graphql.DirectiveNode) => {
                const handler = Reflect.get(this.handler, decorator.name.value);
                if (handler) {
                    ast = handler.bind(this.handler)(node, this, context, decorator)
                }
            });
            if (ast) return ast;
        }
        return this.handler.Class(node, this, context)
    }
    visitPropertyDeclaration(node: ast.PropertyDeclaration, context?: any) {
        let { modifiers, name, decorators, questionToken, jsDoc, exclamationToken, type, initializer } = node.toJson(this, context);
        if (modifiers) {
            if (['private', 'protected', 'static'].some(it => modifiers.includes(it))) {
                return;
            }
        }
        const ast = new graphql.FieldDefinitionNode();
        ast.name = name;
        ast.type = questionToken ? type : new graphql.NonNullTypeNode(type);
        if (type instanceof tsGraphqlAst.TypeNode) {
            type = type.getType();
            ast.type = questionToken ? type : new graphql.NonNullTypeNode(type);
        }
        if (jsDoc) ast.description = this.mergeJsDoc(jsDoc.flat());
        return ast;
    }
    visitQualifiedName(node: ast.QualifiedName, context?: any) {

    }
    visitIdentifier(node: ast.Identifier, context: CompilerContext) {
        const ast = new graphql.NameNode();
        ast.__type = context.typeChecker.getTypeAtLocation(node.__node);
        ast.__node = node.__node;
        ast.value = node.escapedText;
        return ast;
    }

    visitConstructorDeclaration(node: ast.ConstructorDeclaration, context?: any) {
        const { } = node.toJson(this, context, 'body');
    }
    visitExpressionStatement(node: ast.ExpressionStatement, context?: any) {
        const { expression } = node.toJson(this, context);
        return expression;
    }
    visitCallExpression(node: ast.CallExpression, context: CompilerContext): any {
        const { expression, arguments: args } = node.toJson(this, context, 'typeArguments');
        const typeNode = context.create(expression.__type.aliasSymbol || expression.__type.symbol || expression.__type);
        if (typeNode) {
            typeNode.visit(this, context)
            if (Array.isArray(args)) {
                args.map((arg: graphql.NameNode) => {
                    if (arg.__type) {
                        const ast = context.create(arg.__type.aliasSymbol || arg.__type.symbol || arg.__type)
                        if (ast) {
                            return ast.visit(this, context)
                        }
                    }
                })
            }
        }
        return { expression, args };
    }
    visitBlock(node: ast.Block, context?: any) {
        const { statements } = node.toJson(this, context);
        return statements;
    }

    visitExportAssignment(node: ast.ExportAssignment, context?: any) {

    }
    // type
    visitJSDocOptionalType(node: ast.JSDocOptionalType, context?: any) {
        return new tsGraphqlAst.JSDocOptionalType(node, this, context, this.isInput)
    }
    visitConditionalTypeNode(node: ast.ConditionalTypeNode, context: any) {
        return new tsGraphqlAst.ConditionalTypeNode(node, this, context, this.isInput)
    }
    visitInferTypeNode(node: ast.InferTypeNode, context: any) {
        return new tsGraphqlAst.InferTypeNode(node, this, context, this.isInput)
    }
    visitUnionTypeNode(node: ast.UnionTypeNode, context: CompilerContext) {
        return new tsGraphqlAst.UnionTypeNode(node, this, context, this.isInput)
    }
    visitIntersectionTypeNode(node: ast.IntersectionTypeNode, context: any) {
        return new tsGraphqlAst.IntersectionTypeNode(node, this, context, this.isInput)
    }
    visitIndexedAccessTypeNode(node: ast.IndexedAccessTypeNode, context: any) {
        return new tsGraphqlAst.IndexedAccessTypeNode(node, this, context, this.isInput)
    }
    visitLiteralTypeNode(node: ast.LiteralTypeNode, context: any) {
        return new tsGraphqlAst.LiteralTypeNode(node, this, context, this.isInput)
    }
    visitTypeQueryNode(node: ast.TypeQueryNode, context: any) {
        return new tsGraphqlAst.TypeQueryNode(node, this, context, this.isInput)
    }
    visitJSDocAllType(node: ast.JSDocAllType, context: any) {
        return new tsGraphqlAst.JSDocAllType(node, this, context, this.isInput)
    }
    visitJSDocUnknownType(node: ast.JSDocUnknownType, context: any) {
        return new tsGraphqlAst.JSDocUnknownType(node, this, context, this.isInput)
    }
    visitJSDocNamepathType(node: ast.JSDocNamepathType, context: any) {
        return new tsGraphqlAst.JSDocNamepathType(node, this, context, this.isInput)
    }
    visitArrayTypeNode(node: ast.ArrayTypeNode, context: any) {
        return new tsGraphqlAst.ArrayTypeNode(node, this, context, this.isInput)
    }
    visitTupleTypeNode(node: ast.TupleTypeNode, context: any) {
        return new tsGraphqlAst.TupleTypeNode(node, this, context, this.isInput)
    }
    visitOptionalTypeNode(node: ast.OptionalTypeNode, context: any) {
        return new tsGraphqlAst.OptionalTypeNode(node, this, context, this.isInput)
    }
    visitRestTypeNode(node: ast.RestTypeNode, context: any) {
        return new tsGraphqlAst.RestTypeNode(node, this, context, this.isInput)
    }
    visitParenthesizedTypeNode(node: ast.ParenthesizedTypeNode, context?: any) {
        return new tsGraphqlAst.ParenthesizedTypeNode(node, this, context, this.isInput)
    }
    visitKeywordTypeNode(node: ast.KeywordTypeNode, context: CompilerContext) {
        return new tsGraphqlAst.KeywordTypeNode(node, this, context, this.isInput)
    }
    static typeReferenceNode: Map<any, any> = new Map();
    visitTypeReferenceNode(node: ast.TypeReferenceNode, context: CompilerContext) {
        if (TsGraphqlVisitor.typeReferenceNode.has(node.__node)) {
            return TsGraphqlVisitor.typeReferenceNode.get(node.__node)
        }
        const ast = new tsGraphqlAst.TypeReferenceNode(node, this, context, this.isInput);
        TsGraphqlVisitor.typeReferenceNode.set(node.__node, ast)
    }
    visitTypeLiteralNode(node: ast.TypeLiteralNode, context?: any) {
        return new tsGraphqlAst.TypeLiteralNode(node, this, context, this.isInput)
    }
    visitJSDocTypeExpression(node: ast.JSDocTypeExpression, context: CompilerContext) {
        return new tsGraphqlAst.JSDocTypeExpression(node, this, context, this.isInput)
    }
    visitTypeAliasDeclaration(node: ast.TypeAliasDeclaration, context: CompilerContext): any {
        return new tsGraphqlAst.TypeAliasDeclaration(node, this, context, this.isInput)
    }
    visitJSDocFunctionType(node: ast.JSDocFunctionType, context?: any) {
        return new tsGraphqlAst.JSDocFunctionType(node, this, context, this.isInput)
    }
    visitFunctionTypeNode(node: ast.FunctionTypeNode, context?: any) {
        return new tsGraphqlAst.FunctionTypeNode(node, this, context, this.isInput)
    }
    visitConstructorTypeNode(node: ast.ConstructorTypeNode, context: any) {
        return new tsGraphqlAst.ConstructorTypeNode(node, this, context, this.isInput)
    }
    visitMappedTypeNode(node: ast.MappedTypeNode, context?: any) {
        return new tsGraphqlAst.MappedTypeNode(node, this, context, this.isInput);
    }
    visitTypePredicateNode(node: ast.TypePredicateNode, context?: any) {
        return new tsGraphqlAst.TypePredicateNode(node, this, context, this.isInput);
    }
    visitThisTypeNode(node: ast.ThisTypeNode, context?: any) {
        return new tsGraphqlAst.ThisTypeNode(node, this, context, this.isInput)
    }
    visitJSDocVariadicType(node: ast.JSDocVariadicType, context?: any) {
        return new tsGraphqlAst.JSDocVariadicType(node, this, context, this.isInput)
    }
    visitJSDocNonNullableType(node: ast.JSDocNonNullableType, context?: any) {
        return new tsGraphqlAst.JSDocNonNullableType(node, this, context, this.isInput)
    }
    visitJSDocNullableType(node: ast.JSDocNullableType, context?: any) {
        return new tsGraphqlAst.JSDocNullableType(node, this, context, this.isInput)
    }
    visitTypeOperatorNode(node: ast.TypeOperatorNode, context?: any) {
        return new tsGraphqlAst.TypeOperatorNode(node, this, context, this.isInput)
    }
}