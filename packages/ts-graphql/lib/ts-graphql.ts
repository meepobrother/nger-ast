import * as ast from '@nger/ast.tsc';
import * as astTs from '@nger/ast.tsc';
import * as graphql from '@nger/ast.graphql';
import { CompilerContext } from './compiler';
import { join, dirname, extname } from 'path';
import * as ts from 'typescript';
import { existsSync } from 'fs';
import { DecoratorVisitor } from './interfaces/decorator';
import { createNameNode, getTypeName } from './handlers/util';
import { MethodSignature, BooleanLiteral } from '@nger/ast.tsc';
import { NamingStrage } from './naming-strage';
import { StringValueNode, IntValueNode } from '@nger/ast.graphql';
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
        if (node.intrinsicName) {
            return this.createNameType(node.intrinsicName)
        }
    }
    visitBlockScopedVariableSymbol(node: ast.BlockScopedVariableSymbol, context?: any) {
    }
    visitPropertySymbol(node: ast.PropertySymbol, context?: any): any {
        const { valueDeclaration, name, escapedName, flags } = node;
        if (node.intrinsicName) {
            return this.createNameType(node.intrinsicName)
        }
        if (valueDeclaration) {
            return node.valueDeclaration.visit(this, context)
        }
        debugger;
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
    visitClassSymbol(node: ast.ClassSymbol, context: CompilerContext): any {
        const symbol = node.__node;
        const typeToString = context.typeChecker.typeToString(
            context.typeChecker.getTypeOfSymbolAtLocation(symbol!, symbol!.valueDeclaration)
        );
        const _declarations = symbol.getDeclarations();
        const _members = symbol.members
        _members && _members.forEach(member => {
            const typeToString = context.typeChecker.typeToString(
                context.typeChecker.getTypeOfSymbolAtLocation(member!, member!.valueDeclaration)
            );
        })
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
                        let obj = this.interfaceTypeDefinitionNodeToInputObjectTypeDefinitionNode(res, context)
                        if (obj) {
                            context.setStatements(obj);
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
                        let obj = this.interfaceTypeDefinitionNodeToObjectTypeDefinitionNode(res, context)
                        if (obj) {
                            context.setStatements(obj);
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
        const { name, declarations, members } = node;
        if (declarations && declarations.length > 0) {
            return declarations[0].visit(this, context)
        }
        if (node.symbol) {
            if (node.symbol.visit && typeof node.symbol.visit === 'function') {
                return node.symbol.visit(this, context)
            } else {
                if (node.symbol.name === 'Array') {
                    const list = new graphql.ListTypeNode()
                    list.type = new graphql.NamedTypeNode(
                        new graphql.NameNode('Any')
                    )
                    return list;
                } else {
                    return new graphql.NamedTypeNode(
                        new graphql.NameNode('Any')
                    )
                }
            }
        }
        if (node.numberIndexInfo) {
            const type = new graphql.ListTypeNode();
            type.type = new graphql.NamedTypeNode(
                new graphql.NameNode('Any')
            )
            return type;
        }
        if (node.stringIndexInfo) {
            return new graphql.NameNode('ObjectLiteral')
        }
        let fields: any[] = [];
        members && members.forEach((member, key) => {
            const field = new graphql.FieldDefinitionNode();
            field.name = new graphql.NameNode(key);
            if (member.type) {
                const ast = context.create(member.type)
                if (ast) {
                    const res = ast.visit(this, context)
                    if (res instanceof graphql.NameNode) {
                        field.type = new graphql.NamedTypeNode(res)
                    }
                }
            } else {
                const valueDeclaration = context.create(member.valueDeclaration)
                if (valueDeclaration) {
                    const type = valueDeclaration.visit(this, context)
                    if (type instanceof graphql.FieldDefinitionNode) {
                        fields.push(type)
                        return;
                    }
                    debugger;
                }
            }
            fields.push(field)
        })
        return fields;
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
        if (node.intrinsicName) {
            return this.createNameType(node.intrinsicName)
        }
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
                context.isStatement = true;
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
                if (node.type) {
                    const type = node.type.visit(this, context)
                    if (questionToken) {
                        ast.type = type
                    } else {
                        ast.type = new graphql.NonNullTypeNode(type)
                    }
                } else {
                    if (node.name) {
                        const typeNode = context.typeChecker.getTypeAtLocation(node.name.__node)
                        const callSignatures = typeNode.getCallSignatures()
                        if (callSignatures && callSignatures.length === 1) {
                            const res = context.typeChecker.getReturnTypeOfSignature(callSignatures[0])
                            const resAst = context.create(res)
                            if (resAst) {
                                const intrinsicName = Reflect.get(resAst, 'intrinsicName')
                                if (intrinsicName) {
                                    ast.type = new graphql.NamedTypeNode(
                                        this.createNameType(intrinsicName)
                                    )
                                } else {
                                    const type = resAst.visit(this, context)
                                    const graphqlT = new graphql.ObjectTypeDefinitionNode();
                                    graphqlT.name = new graphql.NameNode(this.toUpperCaseFirst(ast.name.value) + 'Output');
                                    if (Array.isArray(type)) {
                                        graphqlT.fields = type;
                                        context.setStatements(graphqlT)
                                        ast.type = new graphql.NamedTypeNode(
                                            graphqlT.name
                                        )
                                    } else if (type instanceof graphql.NameNode) {
                                        ast.type = new graphql.NamedTypeNode(type)
                                    } else if (type instanceof graphql.ListTypeNode) {
                                        ast.type = type;
                                    } else if (type instanceof graphql.ObjectTypeDefinitionNode) {
                                        context.setStatements(type)
                                        ast.type = new graphql.NamedTypeNode(
                                            type.name
                                        )
                                    } else if (type instanceof graphql.NamedTypeNode) {
                                        ast.type = type;
                                    } else {
                                        debugger;
                                    }
                                }
                            }
                        }
                    }
                }
                if (!ast.type) {
                    const sourceFile = node.__node.getSourceFile();
                    const filename = sourceFile.fileName;
                    console.error(`missing type definition! \n${filename}:${ts.getLineAndCharacterOfPosition(sourceFile, node.__node.end).line}\n${node.__node.getText()}\n\n`)
                }
                if (node.parameters) {
                    const old = !!context.isInput;
                    context.isInput = true;
                    ast.arguments = node.parameters.map(it => {
                        return it.visit(this, context)
                    }).filter(it => !!it);
                    context.isInput = old;
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
        const decorators = this.visits(node.decorators, context);
        if (decorators && decorators.length > 0) {
            const hasArgs: graphql.DirectiveNode = decorators.find((it: graphql.DirectiveNode) => it.name.value === 'Args')
            if (hasArgs) {

                const input = new graphql.InputValueDefinitionNode();
                input.name = name;
                if (hasArgs.arguments && hasArgs.arguments.length > 0) {
                    const astNode = hasArgs.arguments[0]
                    if (astNode instanceof graphql.StringValueNode) {
                        const argName: string = astNode.value;
                        input.name = new graphql.NameNode(argName)
                    }
                }
                if (questionToken) {
                    input.type = type;
                } else {
                    input.type = new graphql.NonNullTypeNode(type)
                }
                if (dotDotDotToken) {
                    debugger;
                }
                return input;
            }
        }
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

    }
    visitMethodSignature(node: ast.MethodSignature, context?: any) {
        const ast = node.toJson(this, context)
    }
    visitConstructSignatureDeclaration(node: ast.ConstructSignatureDeclaration, context?: any) {

    }
    visitCallSignatureDeclaration(node: ast.CallSignatureDeclaration, context?: any) {

    }
    visitArrowFunction(node: ast.ArrowFunction, context?: any) {

    }
    visitEnumDeclaration(node: ast.EnumDeclaration, context: CompilerContext): any {
        const { name, members } = node.toJson(this, context);
        let ast = new graphql.EnumTypeDefinitionNode();
        ast.name = name;
        ast.values = members;
        context.setStatements(ast)
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

    visitPropertySignature(node: ast.PropertySignature, context: CompilerContext): any {
        const field = new graphql.FieldDefinitionNode();
        const name = node.name.visit(this, context)
        if (name instanceof graphql.NameNode) {
            field.name = new graphql.NameNode(name.value)
        }
        if (node.type) {
            const type = node.type.visit(this, context)
            if (type instanceof graphql.NameNode) {
                field.type = new graphql.NamedTypeNode(type)
            } else if (type instanceof graphql.FieldDefinitionNode) {
                type.name = field.name;
                return type;
            } else if (type instanceof graphql.NamedTypeNode) {
                field.type = type;
            } else if (type instanceof graphql.ListTypeNode) {
                field.type = type;
            } else {
                debugger;
            }
        }
        if (!node.questionToken) {
            field.type = new graphql.NonNullTypeNode(
                field.type as any
            )
        }
        return field;
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
    visitPropertyDeclaration(node: ast.PropertyDeclaration, context: CompilerContext) {
        let { modifiers, name, decorators, questionToken, jsDoc, exclamationToken, type, initializer } = node.toJson(this, context);
        if (modifiers) {
            if (['private', 'protected', 'static'].some(it => modifiers.includes(it))) {
                return;
            }
        }
        const ast = new graphql.FieldDefinitionNode();
        ast.name = name;
        ast.type = questionToken ? type : new graphql.NonNullTypeNode(type);
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
                args.filter(it => !!it).map((arg: graphql.NameNode) => {
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

    }
    visitConditionalTypeNode(node: ast.ConditionalTypeNode, context: any) {

    }
    visitInferTypeNode(node: ast.InferTypeNode, context: any) {

    }
    createNameType(keyword: string) {
        let value: string = '';
        switch (keyword) {
            case 'object':
                value = 'Object';
                break;
            case 'string':
                value = 'String';
                break;
            case 'any':
                value = 'Any';
                break;
            case 'number':
                value = 'Int';
                break;
            case 'bigint':
                value = 'BigInt';
                break;
            case 'undefined':
            case 'void':
            case 'never':
            case 'void':
                break;
            case 'boolean':
                value = 'Boolean';
                break;
            default:
                break;
        }
        if (value.length > 0) return new graphql.NameNode(value);
    }
    visitKeywordTypeNode(node: ast.KeywordTypeNode, context: CompilerContext) {
        const { keyword } = node;
        return this.createNameType(keyword);
    }
    visitUnionTypeNode(node: ast.UnionTypeNode, context: CompilerContext): any {
        let types = node.types
            .map(it => it.visit(this, context))
            .filter(it => !!it)
        if (types.length === 1) {
            return types[0]
        }
        const isString = types.every(it => {
            if (it instanceof StringValueNode) return true;
            if (it instanceof graphql.NameNode) {
                return it.value === 'String'
            }
            return false;
        });
        if (isString) {
            return new graphql.NameNode('String')
        }
        const isNumber = types.every(it => {
            if (it instanceof IntValueNode) {
                return true;
            }
            if (it instanceof graphql.NameNode) {
                return it.value === 'Int' || it.value === 'Float'
            }
            return false;
        })
        if (isNumber) {
            return new graphql.NameNode('Int')
        }
        return new graphql.NameNode(types.map((it: graphql.NameNode) => it.value).join('OR'))
    }
    visitIntersectionTypeNode(node: ast.IntersectionTypeNode, context: any) {

    }
    visitIndexedAccessTypeNode(node: ast.IndexedAccessTypeNode, context: any) {

    }
    visitLiteralTypeNode(node: ast.LiteralTypeNode, context: any): any {
        const { literal } = node;
        return literal.visit(this, context)
    }
    visitTypeQueryNode(node: ast.TypeQueryNode, context: any) {

    }
    visitJSDocAllType(node: ast.JSDocAllType, context: any) {

    }
    visitJSDocUnknownType(node: ast.JSDocUnknownType, context: any) {

    }
    visitJSDocNamepathType(node: ast.JSDocNamepathType, context: any) {

    }
    visitArrayTypeNode(node: ast.ArrayTypeNode, context: any) {
        const elementType = node.elementType;
        const list = new graphql.ListTypeNode();
        const type = elementType.visit(this, context)
        if (type instanceof graphql.NamedTypeNode) {
            list.type = type;
        }
        if (type instanceof graphql.NameNode) {
            list.type = new graphql.NamedTypeNode(type)
        }
        return list;
    }
    visitTupleTypeNode(node: ast.TupleTypeNode, context: any) {

    }
    visitOptionalTypeNode(node: ast.OptionalTypeNode, context: any) {

    }
    visitRestTypeNode(node: ast.RestTypeNode, context: any) {

    }
    visitParenthesizedTypeNode(node: ast.ParenthesizedTypeNode, context?: any) {

    }

    static typeReferenceNode: Map<any, any> = new Map();
    namingStrage: NamingStrage = new NamingStrage()
    typeUnionToGraphqlInput(type: ts.UnionType, context: CompilerContext) {
        let node = type.getNonNullableType();
        if (node.flags === ts.TypeFlags.Union) {
            const _node = node as ts.UnionType;
            let types = _node.types.filter(it => it.flags !== ts.TypeFlags.Null);
            if (types.length === 1) {
                if (context.isInput) return this.typeToGraphqlInput(types[0], context)
                return this.typeToGraphqlType(types[0], context)
            } else {
                const isString = types.every(it => it.flags === ts.TypeFlags.String || it.flags === ts.TypeFlags.StringLike || it.flags === ts.TypeFlags.StringLiteral || it.flags === ts.TypeFlags.StringOrNumberLiteral)
                if (isString) {
                    return new graphql.NameNode(`String`)
                }
                const isBoolean = types.every(it => it.flags === ts.TypeFlags.BooleanLiteral || it.flags === ts.TypeFlags.Boolean || it.flags === ts.TypeFlags.BooleanLike)
                if (isBoolean) {
                    return new graphql.NameNode('Boolean')
                }
                const isNumber = types.every(it => it.flags === ts.TypeFlags.Number || it.flags === ts.TypeFlags.NumberLike || it.flags === ts.TypeFlags.NumberLiteral)
                if (isNumber) {
                    return new graphql.NameNode('Int')
                }
                const unionTypeNode = new graphql.UnionTypeDefinitionNode();
                unionTypeNode.types = types.map(it => {
                    if (context.isInput) return this.typeToGraphqlInput(it, context)
                    return this.typeToGraphqlType(it, context)
                }).map(it => {
                    if (it instanceof graphql.ListTypeNode) {
                        return new graphql.NamedTypeNode(
                            new graphql.NameNode(
                                getTypeName(it)
                            )
                        )
                    }
                    else return new graphql.NamedTypeNode(it)
                })
                unionTypeNode.name = new graphql.NameNode(
                    unionTypeNode.types.map(it => it.name.value).join('Or')
                );
                context.setStatements(unionTypeNode);
                return unionTypeNode.name;
            }
        }
        if (context.isInput) return this.typeToGraphqlInput(node, context)
        return this.typeToGraphqlType(node, context)
    }
    typeToGraphqlInput(node: ts.Type, context: CompilerContext): graphql.NameNode | graphql.ListTypeNode {
        switch (node.flags) {
            case ts.TypeFlags.Any:
                return new graphql.NameNode(`Any`)
            case ts.TypeFlags.String:
            case ts.TypeFlags.StringLike:
            case ts.TypeFlags.StringLiteral:
            case ts.TypeFlags.StringOrNumberLiteral:
                return new graphql.NameNode(`String`)
            case ts.TypeFlags.Number:
            case ts.TypeFlags.NumberLike:
            case ts.TypeFlags.NumberLiteral:
                return new graphql.NameNode(`Int`)
            case ts.TypeFlags.Boolean:
            case ts.TypeFlags.BooleanLike:
            case ts.TypeFlags.BooleanLiteral:
                return new graphql.NameNode(`Boolean`)
            case ts.TypeFlags.Unknown:
                return new graphql.NameNode(`Unknown`)
            case ts.TypeFlags.BigInt:
            case ts.TypeFlags.BigIntLiteral:
            case ts.TypeFlags.BigIntLike:
                return new graphql.NameNode(`BigInt`)
            case ts.TypeFlags.Enum:
            case ts.TypeFlags.EnumLiteral:
            case ts.TypeFlags.EnumLike:
                return new graphql.NameNode(`Enum`)
            case ts.TypeFlags.ESSymbol:
            case ts.TypeFlags.ESSymbolLike:
            case ts.TypeFlags.UniqueESSymbol:
                return new graphql.NameNode(`ESSymbol`)
            case ts.TypeFlags.Instantiable:
            case ts.TypeFlags.InstantiablePrimitive:
            case ts.TypeFlags.InstantiableNonPrimitive:
            case ts.TypeFlags.StructuredOrInstantiable:
                return new graphql.NameNode(`Instantiable`)
            case ts.TypeFlags.Void:
            case ts.TypeFlags.VoidLike:
                return new graphql.NameNode(`Void`)
            case ts.TypeFlags.Undefined:
                return new graphql.NameNode(`Undefined`)
            case ts.TypeFlags.Null:
                return new graphql.NameNode(`Null`)
            case ts.TypeFlags.Never:
                return new graphql.NameNode(`Never`)
            case ts.TypeFlags.TypeParameter:
                return new graphql.NameNode(`TypeParameter`)
            case ts.TypeFlags.Union:
                return this.typeUnionToGraphqlInput(node as ts.UnionType, context)
            case ts.TypeFlags.Intersection:
                return new graphql.NameNode(`Intersection`)
            case ts.TypeFlags.Index:
                return new graphql.NameNode(`Index`)
            case ts.TypeFlags.IndexedAccess:
                return new graphql.NameNode(`IndexedAccess`)
            case ts.TypeFlags.Conditional:
                return new graphql.NameNode(`Conditional`)
            case ts.TypeFlags.Substitution:
                return new graphql.NameNode(`Substitution`)
            case ts.TypeFlags.NonPrimitive:
                return new graphql.NameNode(`NonPrimitive`)
            case ts.TypeFlags.Literal:
                return new graphql.NameNode(`Literal`)
            case ts.TypeFlags.Unit:
                return new graphql.NameNode(`Literal`)
            case ts.TypeFlags.PossiblyFalsy:
                return new graphql.NameNode(`PossiblyFalsy`)
            case ts.TypeFlags.UnionOrIntersection:
                return new graphql.NameNode(`UnionOrIntersection`)
            case ts.TypeFlags.StructuredType:
                return new graphql.NameNode(`StructuredType`)
            case ts.TypeFlags.TypeVariable:
                return new graphql.NameNode(`TypeVariable`)
            case ts.TypeFlags.Narrowable:
                return new graphql.NameNode(`Narrowable`)
            case ts.TypeFlags.NotUnionOrUnit:
                return new graphql.NameNode(`NotUnionOrUnit`)
            case ts.TypeFlags.Object:
            default:
                break;
        }
        const input = new graphql.InputObjectTypeDefinitionNode();
        const fields: graphql.InputValueDefinitionNode[] = [];
        const properties = node.getProperties();
        const numberIndexType = node.getNumberIndexType();
        if (numberIndexType) {
            const indexType = this.typeToGraphqlInput(numberIndexType, context)
            if (indexType instanceof graphql.InputObjectTypeDefinitionNode) {
                return new graphql.ListTypeNode(
                    new graphql.NamedTypeNode(
                        indexType.name
                    )
                );
            } else if (indexType instanceof graphql.ListTypeNode) {
                return new graphql.ListTypeNode(indexType);
            } else {
                return new graphql.ListTypeNode(new graphql.NamedTypeNode(
                    indexType
                ));
            }
        }
        let typeToString = this.namingStrage.create(context.typeChecker.typeToString(
            node
        ), context);
        const statement = context.getStatement(typeToString)
        if (statement) {
            if(statement instanceof graphql.ScalarTypeDefinitionNode){
                return new graphql.NameNode(typeToString)
            }
            if(statement instanceof graphql.EnumTypeDefinitionNode){
                return new graphql.NameNode(typeToString)
            }
            if(statement instanceof graphql.UnionTypeDefinitionNode){
                return new graphql.NameNode(typeToString)
            }
            const isInput = statement instanceof graphql.InputObjectTypeDefinitionNode
            if (!isInput) {
                typeToString += 'Input'
            }
        }
        input.name = new graphql.NameNode(typeToString)
        if (context.hasStatement(typeToString)) {
            return input.name
        }
        context.setStatements(input)
        input.name = new graphql.NameNode(typeToString)
        properties.map(it => {
            const field = new graphql.InputValueDefinitionNode();
            field.name = new graphql.NameNode(it.getName())
            let type = Reflect.get(it, 'type')
            const valueDeclaration = Reflect.get(it, 'valueDeclaration')
            let questionToken = valueDeclaration && valueDeclaration.questionToken;
            if (type) {
                const graphqlType = this.typeToGraphqlInput(type, context);
                if (graphqlType instanceof graphql.NameNode) {
                    field.type = new graphql.NamedTypeNode(graphqlType)
                    fields.push(field)
                    return;
                } else if (graphqlType instanceof graphql.ListTypeNode) {
                    field.type = graphqlType;
                    fields.push(field)
                    return;
                }
            } else {
                const val = context.create(valueDeclaration);
                if (val instanceof MethodSignature) {
                    return;
                } else {
                    const ast = context.create(valueDeclaration.type);
                    if (ast) {
                        const type = ast.visit(this, context)
                        if (type instanceof graphql.NameNode) {
                            field.type = new graphql.NamedTypeNode(type)
                        } else if (type instanceof graphql.NamedTypeNode) {
                            field.type = type;
                        } else if (type instanceof graphql.ListTypeNode) {
                            field.type = type;
                        } else if (Array.isArray(type)) {
                            const graphqlT = new graphql.InputObjectTypeDefinitionNode();
                            graphqlT.fields = type.filter((it: graphql.FieldDefinitionNode) => (it.arguments || []).length === 0);
                            graphqlT.name = new graphql.NameNode(
                                typeToString + this.toUpperCaseFirst(it.getName())
                            );
                            context.setStatements(graphqlT);
                            field.type = new graphql.NamedTypeNode(
                                graphqlT.name
                            )
                        } else {
                            field.type = new graphql.NamedTypeNode(
                                new graphql.NameNode('Object')
                            )
                        }
                    }
                }
            }
            if (!questionToken) {
                field.type = new graphql.NonNullTypeNode(
                    field.type as any
                )
            }
            field.description = new graphql.StringValueNode(
                ts.displayPartsToString(it.getDocumentationComment(context.typeChecker))
            );
            fields.push(field)
        });
        input.fields = fields;
        return input.name;
    }
    toUpperCaseFirst(name: string) {
        const [frist, ...others] = name.split('')
        return [frist.toUpperCase(), ...others].join('')
    }
    typeToGraphqlType(node: ts.Type, context: CompilerContext): graphql.NameNode | graphql.ListTypeNode {
        switch (node.flags) {
            case ts.TypeFlags.Any:
                return new graphql.NameNode(`Any`)
            case ts.TypeFlags.String:
            case ts.TypeFlags.StringLike:
            case ts.TypeFlags.StringLiteral:
            case ts.TypeFlags.StringOrNumberLiteral:
                return new graphql.NameNode(`String`)
            case ts.TypeFlags.Number:
            case ts.TypeFlags.NumberLike:
            case ts.TypeFlags.NumberLiteral:
                return new graphql.NameNode(`Int`)
            case ts.TypeFlags.Boolean:
            case ts.TypeFlags.BooleanLike:
            case ts.TypeFlags.BooleanLiteral:
                return new graphql.NameNode(`Boolean`)
            case ts.TypeFlags.Unknown:
                return new graphql.NameNode(`Unknown`)
            case ts.TypeFlags.BigInt:
            case ts.TypeFlags.BigIntLiteral:
            case ts.TypeFlags.BigIntLike:
                return new graphql.NameNode(`BigInt`)
            case ts.TypeFlags.Enum:
            case ts.TypeFlags.EnumLiteral:
            case ts.TypeFlags.EnumLike:
                return new graphql.NameNode(`Enum`)
            case ts.TypeFlags.ESSymbol:
            case ts.TypeFlags.ESSymbolLike:
            case ts.TypeFlags.UniqueESSymbol:
                return new graphql.NameNode(`ESSymbol`)
            case ts.TypeFlags.Instantiable:
            case ts.TypeFlags.InstantiablePrimitive:
            case ts.TypeFlags.InstantiableNonPrimitive:
            case ts.TypeFlags.StructuredOrInstantiable:
                return new graphql.NameNode(`Instantiable`)
            case ts.TypeFlags.Void:
            case ts.TypeFlags.VoidLike:
                return new graphql.NameNode(`Void`)
            case ts.TypeFlags.Undefined:
                return new graphql.NameNode(`Undefined`)
            case ts.TypeFlags.Null:
                return new graphql.NameNode(`Null`)
            case ts.TypeFlags.Never:
                return new graphql.NameNode(`Never`)
            case ts.TypeFlags.TypeParameter:
                return new graphql.NameNode(`TypeParameter`)
            case ts.TypeFlags.Union:
                return this.typeUnionToGraphqlInput(node as ts.UnionType, context)
            case ts.TypeFlags.Intersection:
                return new graphql.NameNode(`Intersection`)
            case ts.TypeFlags.Index:
                return new graphql.NameNode(`Index`)
            case ts.TypeFlags.IndexedAccess:
                return new graphql.NameNode(`IndexedAccess`)
            case ts.TypeFlags.Conditional:
                return new graphql.NameNode(`Conditional`)
            case ts.TypeFlags.Substitution:
                return new graphql.NameNode(`Substitution`)
            case ts.TypeFlags.NonPrimitive:
                return new graphql.NameNode(`NonPrimitive`)
            case ts.TypeFlags.Literal:
                return new graphql.NameNode(`Literal`)
            case ts.TypeFlags.Unit:
                return new graphql.NameNode(`Literal`)
            case ts.TypeFlags.PossiblyFalsy:
                return new graphql.NameNode(`PossiblyFalsy`)
            case ts.TypeFlags.UnionOrIntersection:
                return new graphql.NameNode(`UnionOrIntersection`)
            case ts.TypeFlags.StructuredType:
                return new graphql.NameNode(`StructuredType`)
            case ts.TypeFlags.TypeVariable:
                return new graphql.NameNode(`TypeVariable`)
            case ts.TypeFlags.Narrowable:
                return new graphql.NameNode(`Narrowable`)
            case ts.TypeFlags.NotUnionOrUnit:
                return new graphql.NameNode(`NotUnionOrUnit`)
            case ts.TypeFlags.Object:
            default:
                break;
        }
        const input = new graphql.ObjectTypeDefinitionNode();
        const fields: graphql.FieldDefinitionNode[] = [];
        const properties = node.getProperties();
        const numberIndexType = node.getNumberIndexType();
        if (numberIndexType) {
            const indexType = this.typeToGraphqlType(numberIndexType, context)
            if (indexType instanceof graphql.ListTypeNode) {
                return new graphql.ListTypeNode(indexType);
            } else {
                return new graphql.ListTypeNode(new graphql.NamedTypeNode(
                    indexType
                ));
            }
        }
        let typeToString = this.namingStrage.create(context.typeChecker.typeToString(
            node
        ), context);
        const statement = context.getStatement(typeToString)
        if (statement) {
            if(statement instanceof graphql.ScalarTypeDefinitionNode){
                return new graphql.NameNode(typeToString)
            }
            if(statement instanceof graphql.EnumTypeDefinitionNode){
                return new graphql.NameNode(typeToString)
            }
            if(statement instanceof graphql.UnionTypeDefinitionNode){
                return new graphql.NameNode(typeToString)
            }
            const isInput = statement instanceof graphql.InputObjectTypeDefinitionNode
            if (isInput) {
                typeToString += 'Type'
            }
        }
        input.name = new graphql.NameNode(typeToString)
        if (context.hasStatement(typeToString)) {
            return input.name
        }
        context.setStatements(input)
        properties.map(it => {
            const field = new graphql.FieldDefinitionNode();
            field.name = new graphql.NameNode(it.getName())
            const type = Reflect.get(it, 'type')
            const valueDeclaration = Reflect.get(it, 'valueDeclaration')
            const questionToken = valueDeclaration.questionToken;
            if (type) {
                const gt = this.typeToGraphqlType(type, context)
                if (gt instanceof graphql.ObjectTypeDefinitionNode) {
                    field.type = new graphql.NamedTypeNode(gt.name)
                } else if (gt instanceof graphql.ListTypeNode) {
                    field.type = gt;
                } else {
                    field.type = new graphql.NamedTypeNode(gt)
                }
            } else {
                const ast = context.create(valueDeclaration);
                if (ast instanceof MethodSignature) {
                    field.arguments = ast.parameters.map(it => it.visit(this, context))
                    if (ast.type) {
                        const type = ast.type.visit(this, context);
                        if (type instanceof graphql.NameNode) {
                            field.type = new graphql.NamedTypeNode(type)
                        } else if (type instanceof graphql.NamedTypeNode) {
                            field.type = type;
                        } else if (type instanceof graphql.ListTypeNode) {
                            field.type = type;
                        }
                    }
                } else {
                    const ast = context.create(valueDeclaration.type);
                    const decorators = (valueDeclaration.decorators || []).map((it: any) => context.create(it))
                    const isPrimary = decorators.some((it: ast.Decorator) => {
                        const { expression } = it;
                        if (expression instanceof astTs.CallExpression) {
                            const { expression: exp, arguments: args } = expression;
                            if (exp instanceof astTs.Identifier) {
                                const { escapedText } = exp;
                                if (['PrimaryGeneratedColumn', 'ObjectIdColumn', 'PrimaryColumn'].includes(escapedText)) return true;
                            }
                            return (args || []).some(it => {
                                if (it instanceof astTs.ObjectLiteralExpression) {
                                    const { properties } = it;
                                    return !!properties.find(it => {
                                        if (it instanceof astTs.PropertyAssignment) {
                                            if (it.name instanceof astTs.Identifier) {
                                                if (it.name.escapedText === 'unique') {
                                                    if (it.initializer instanceof BooleanLiteral) {
                                                        if (it.initializer.isTrue()) {
                                                            return true;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        return false;
                                    })
                                }
                            })
                        }
                        return false;
                    })
                    if (ast) {
                        const type = ast.visit(this, context)
                        if (type instanceof graphql.NameNode) {
                            field.type = new graphql.NamedTypeNode(type)
                        } else if (type instanceof graphql.NamedTypeNode) {
                            field.type = type;
                        } else if (type instanceof graphql.ListTypeNode) {
                            field.type = type;
                        } else if (Array.isArray(type)) {
                            const graphqlT = new graphql.ObjectTypeDefinitionNode();
                            graphqlT.fields = type;
                            graphqlT.name = new graphql.NameNode(
                                typeToString + this.toUpperCaseFirst(it.getName())
                            );
                            context.setStatements(graphqlT);
                            field.type = new graphql.NamedTypeNode(
                                graphqlT.name
                            )
                        } else {
                            debugger;
                            field.type = new graphql.NamedTypeNode(
                                new graphql.NameNode('Object')
                            )
                        }
                    }
                    if (isPrimary) {
                        const primary = new graphql.DirectiveNode()
                        primary.name = new graphql.NameNode('key')
                        const args = new graphql.ArgumentNode();
                        args.name = new graphql.NameNode('fields')
                        args.value = new graphql.StringValueNode(field.name.value)
                        primary.arguments = [
                            args
                        ];
                        input.directives = input.directives || [];
                        input.directives.push(primary)
                    }
                }
            }
            if (!questionToken) {
                field.type = new graphql.NonNullTypeNode(
                    field.type as any
                )
            }
            field.description = new graphql.StringValueNode(
                ts.displayPartsToString(it.getDocumentationComment(context.typeChecker))
            );
            fields.push(field)
        });
        input.fields = fields;
        return input.name;
    }
    visitTypeReferenceNode(node: ast.TypeReferenceNode, context: CompilerContext): any {
        const typeName = node.typeName.visit(this, context)
        if (typeName.value && node.typeArguments) {
            switch (typeName.value) {
                case 'AsyncIterator':
                case 'Subject':
                case 'Observable':
                case 'AsyncSubject':
                case 'BehaviorSubject':
                case 'ReplaySubject':
                case "Promise":
                    return node.typeArguments[0].visit(this, context)
            }
        }
        const type = context.typeChecker.getTypeFromTypeNode(node.__node)
        if (context.isInput) {
            const input = this.typeToGraphqlInput(type, context)
            if (input) {
                if (input instanceof graphql.ListTypeNode) {
                    return input
                } else {
                    return new graphql.NamedTypeNode(input)
                }
            }
        } else {
            const input = this.typeToGraphqlType(type, context)
            if (input) {
                if (input instanceof graphql.ObjectTypeDefinitionNode) {
                    return new graphql.NamedTypeNode(input.name)
                } else if (input instanceof graphql.ListTypeNode) {
                    return input;
                } else {
                    return new graphql.NamedTypeNode(input)
                }
            }
        }
    }
    visitTypeLiteralNode(node: ast.TypeLiteralNode, context?: any): any[] {
        return node.members && node.members.map(it => {
            const type = it.visit(this, context)
            return type;
        })
    }
    visitJSDocTypeExpression(node: ast.JSDocTypeExpression, context: CompilerContext) {

    }
    visitTypeAliasDeclaration(node: ast.TypeAliasDeclaration, context: CompilerContext): any {

    }
    visitJSDocFunctionType(node: ast.JSDocFunctionType, context?: any) {

    }
    visitFunctionTypeNode(node: ast.FunctionTypeNode, context?: any) {
        const ast = new graphql.FieldDefinitionNode();
        ast.arguments = node.parameters.map(par => par.visit(this, context))
        const type = node.type.visit(this, context)
        ast.type = new graphql.NamedTypeNode(type)
        return ast;
    }
    visitConstructorTypeNode(node: ast.ConstructorTypeNode, context: any) {

    }
    visitMappedTypeNode(node: ast.MappedTypeNode, context?: any) {

    }
    visitTypePredicateNode(node: ast.TypePredicateNode, context?: any) {

    }
    visitThisTypeNode(node: ast.ThisTypeNode, context?: any) {

    }
    visitJSDocVariadicType(node: ast.JSDocVariadicType, context?: any) {

    }
    visitJSDocNonNullableType(node: ast.JSDocNonNullableType, context?: any) {

    }
    visitJSDocNullableType(node: ast.JSDocNullableType, context?: any) {

    }
    visitTypeOperatorNode(node: ast.TypeOperatorNode, context?: any) {

    }
}
