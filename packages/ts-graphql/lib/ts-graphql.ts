import * as ast from '@nger/ast_ts';
import * as graphql from '@nger/ast.graphql';
import { CompilerContext } from './compiler';
import { join, dirname, extname } from 'path';
import * as ts from 'typescript';
import { existsSync } from 'fs';
import { hasModuleDecorator } from './handlers/mdoule.handler';

export class TsGraphqlContext {
    graphql: graphql.DocumentNode = new graphql.DocumentNode();
}
export class TsGraphqlVisitor implements ast.Visitor {
    visitNoneSymbol(node: ast.NoneSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitFunctionScopedVariableSymbol(node: ast.FunctionScopedVariableSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitBlockScopedVariableSymbol(node: ast.BlockScopedVariableSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitPropertySymbol(node: ast.PropertySymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitEnumMemberSymbol(node: ast.EnumMemberSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitFunctionSymbol(node: ast.FunctionSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitClassSymbol(node: ast.ClassSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitInterfaceSymbol(node: ast.InterfaceSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitConstEnumSymbol(node: ast.ConstEnumSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitRegularEnumSymbol(node: ast.RegularEnumSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitValueModuleSymbol(node: ast.ValueModuleSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitNamespaceModuleSymbol(node: ast.NamespaceModuleSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitTypeLiteralSymbol(node: ast.TypeLiteralSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitObjectLiteralSymbol(node: ast.ObjectLiteralSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitMethodSymbol(node: ast.MethodSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitConstructorSymbol(node: ast.ConstructorSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitGetAccessorSymbol(node: ast.GetAccessorSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitSetAccessorSymbol(node: ast.SetAccessorSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitSignatureSymbol(node: ast.SignatureSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitTypeParameterSymbol(node: ast.TypeParameterSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitTypeAliasSymbol(node: ast.TypeAliasSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitExportValueSymbol(node: ast.ExportValueSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitAliasSymbol(node: ast.AliasSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitPrototypeSymbol(node: ast.PrototypeSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitExportStarSymbol(node: ast.ExportStarSymbol, context?: any) {
        const { } = node.toJson(this, context);
        debugger;
    }
    visitOptionalSymbol(node: ast.OptionalSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitTransientSymbol(node: ast.TransientSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitAssignmentSymbol(node: ast.AssignmentSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitModuleExportsSymbol(node: ast.ModuleExportsSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitEnumSymbol(node: ast.EnumSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitVariableSymbol(node: ast.VariableSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitValueSymbol(node: ast.ValueSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitTypeSymbol(node: ast.TypeSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitNamespaceSymbol(node: ast.NamespaceSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitModuleSymbol(node: ast.ModuleSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitAccessorSymbol(node: ast.AccessorSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitFunctionScopedVariableExcludesSymbol(node: ast.FunctionScopedVariableExcludesSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitBlockScopedVariableExcludesSymbol(node: ast.BlockScopedVariableExcludesSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitParameterExcludesSymbol(node: ast.ParameterExcludesSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitPropertyExcludesSymbol(node: ast.PropertyExcludesSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitEnumMemberExcludesSymbol(node: ast.EnumMemberExcludesSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitFunctionExcludesSymbol(node: ast.FunctionExcludesSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitClassExcludesSymbol(node: ast.ClassExcludesSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitInterfaceExcludesSymbol(node: ast.InterfaceExcludesSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitRegularEnumExcludesSymbol(node: ast.RegularEnumExcludesSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitConstEnumExcludesSymbol(node: ast.ConstEnumExcludesSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitValueModuleExcludesSymbol(node: ast.ValueModuleExcludesSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitNamespaceModuleExcludesSymbol(node: ast.NamespaceModuleExcludesSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitMethodExcludesSymbol(node: ast.MethodExcludesSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitGetAccessorExcludesSymbol(node: ast.GetAccessorExcludesSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitSetAccessorExcludesSymbol(node: ast.SetAccessorExcludesSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitTypeParameterExcludesSymbol(node: ast.TypeParameterExcludesSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitTypeAliasExcludesSymbol(node: ast.TypeAliasExcludesSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitAliasExcludesSymbol(node: ast.AliasExcludesSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitModuleMemberSymbol(node: ast.ModuleMemberSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitExportHasLocalSymbol(node: ast.ExportHasLocalSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitBlockScopedSymbol(node: ast.BlockScopedSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitPropertyOrAccessorSymbol(node: ast.PropertyOrAccessorSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitClassMemberSymbol(node: ast.ClassMemberSymbol, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitConditionalTypeNode(node: ast.ConditionalTypeNode, context: any) {
        throw new Error("Method not implemented.");
    }
    visitInferTypeNode(node: ast.InferTypeNode, context: any) {
        throw new Error("Method not implemented.");
    }
    visitUnionTypeNode(node: ast.UnionTypeNode, context: any) {
        const { types } = node.toJson(this, context);
        return types;
    }
    visitIntersectionTypeNode(node: ast.IntersectionTypeNode, context: any) {
        throw new Error("Method not implemented.");
    }
    visitIndexedAccessTypeNode(node: ast.IndexedAccessTypeNode, context: any) {
        throw new Error("Method not implemented.");
    }
    visitRegularExpressionLiteral(node: ast.RegularExpressionLiteral, context: any) {
        throw new Error("Method not implemented.");
    }
    visitLiteralTypeNode(node: ast.LiteralTypeNode, context: any) {
        throw new Error("Method not implemented.");
    }
    visitTypeQueryNode(node: ast.TypeQueryNode, context: any) {
        throw new Error("Method not implemented.");
    }
    visitJSDocAllType(node: ast.JSDocAllType, context: any) {
        throw new Error("Method not implemented.");
    }
    visitJSDocUnknownType(node: ast.JSDocUnknownType, context: any) {
        throw new Error("Method not implemented.");
    }
    visitJSDocNamepathType(node: ast.JSDocNamepathType, context: any) {
        throw new Error("Method not implemented.");
    }
    visitArrayTypeNode(node: ast.ArrayTypeNode, context: any) {
        const { elementType } = node.toJson(this, context);
    }
    visitTupleTypeNode(node: ast.TupleTypeNode, context: any) {
        throw new Error("Method not implemented.");
    }
    visitOptionalTypeNode(node: ast.OptionalTypeNode, context: any) {
        throw new Error("Method not implemented.");
    }
    visitRestTypeNode(node: ast.RestTypeNode, context: any) {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
    visitJSDocTypeTag(node: ast.JSDocTypeTag, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJSDocUnknownTag(node: ast.JSDocUnknownTag, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJSDocAugmentsTag(node: ast.JSDocAugmentsTag, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJSDocAuthorTag(node: ast.JSDocAuthorTag, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJSDocClassTag(node: ast.JSDocClassTag, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJSDocEnumTag(node: ast.JSDocEnumTag, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitParenthesizedTypeNode(node: ast.ParenthesizedTypeNode, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitSetAccessorDeclaration(node: ast.SetAccessorDeclaration, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitMethodDeclaration(node: ast.MethodDeclaration, context?: any) {
        let { name, type, jsDoc, typeParameters, decorators, modifiers, parameters, asteriskToken, questionToken, exclamationToken } = node.toJson(this, context, 'body');
        if (modifiers) {
            if (['private', 'protected', 'static'].some(it => modifiers.includes(it))) {
                return;
            }
        }
        const needDecorators = ['Query', 'Mutation', 'Subscription'];
        if (decorators && decorators.map((it: any) => it.name.value).some((it: any) => needDecorators.includes(it))) {
            const ast = new graphql.FieldDefinitionNode()
            ast.name = name;
            ast.arguments = parameters;
            ast.directives = decorators.filter((it: any) => !!it).filter((it: any) => !needDecorators.includes(it.name.value));
            ast.type = questionToken ? type : new graphql.NonNullTypeNode(type);
            if (jsDoc) ast.description = this.mergeJsDoc(jsDoc.flat());
            return ast;
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
        throw new Error("Method not implemented.");
    }
    visitJsxText(node: ast.JsxText, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitSpreadAssignment(node: ast.SpreadAssignment, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitPropertyAssignment(node: ast.PropertyAssignment, context?: any) {
        const { name, questionToken, initializer } = node.toJson(this, context);
        const file = new graphql.ObjectFieldNode();
        file.name = name;
        file.value = initializer;
        return file;
    }
    visitShorthandPropertyAssignment(node: ast.ShorthandPropertyAssignment, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitEmptyStatement(node: ast.EmptyStatement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJsxTagNamePropertyAccess(node: ast.JsxTagNamePropertyAccess, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitIfStatement(node: ast.IfStatement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitDebuggerStatement(node: ast.DebuggerStatement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitNotEmittedStatement(node: ast.NotEmittedStatement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitDefaultClause(node: ast.DefaultClause, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitNamespaceDeclaration(node: ast.NamespaceDeclaration, context?: any) {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
    visitCaseClause(node: ast.CaseClause, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitComputedPropertyName(node: ast.ComputedPropertyName, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitObjectBindingPattern(node: ast.ObjectBindingPattern, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitArrayBindingPattern(node: ast.ArrayBindingPattern, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitParameterDeclaration(node: ast.ParameterDeclaration, context?: any) {
        const { dotDotDotToken, name, questionToken, type, initializer } = node.toJson(this, context);
        const input = new graphql.InputValueDefinitionNode();
        input.name = name;
        input.type = questionToken ? type : new graphql.NonNullTypeNode(type);
        if (dotDotDotToken) {
            // throw new Error(`method parameter not support ...`)
        }
        return input;
    }
    visitBindingElement(node: ast.BindingElement, context?: any) {
        throw new Error("Method not implemented.");
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
        const { name, initializer } = node.toJson(this, context);
    }
    visitDoStatement(node: ast.DoStatement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitWhileStatement(node: ast.WhileStatement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitForStatement(node: ast.ForStatement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitForInStatement(node: ast.ForInStatement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitForOfStatement(node: ast.ForOfStatement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitBreakStatement(node: ast.BreakStatement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitContinueStatement(node: ast.ContinueStatement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitReturnStatement(node: ast.ReturnStatement, context?: any) {
        const { expression } = node.toJson(this, context);
        return expression;
    }
    visitWithStatement(node: ast.WithStatement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitLabeledStatement(node: ast.LabeledStatement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitCaseBlock(node: ast.CaseBlock, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitSwitchStatement(node: ast.SwitchStatement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitThrowStatement(node: ast.ThrowStatement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitCatchClause(node: ast.CatchClause, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitTryStatement(node: ast.TryStatement, context?: any) {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
    visitJSDocNamespaceDeclaration(node: ast.JSDocNamespaceDeclaration, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJsxSpreadAttribute(node: ast.JsxSpreadAttribute, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitStringLiteral(node: ast.StringLiteral, context?: any) {
        return new graphql.StringValueNode(node.text)
    }
    visitJsxAttribute(node: ast.JsxAttribute, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitObjectLiteralExpression(node: ast.ObjectLiteralExpression, context?: any) {
        const { properties } = node.toJson(this, context);
        const obj = new graphql.ObjectValueNode();
        obj.fields = properties;
        return obj;
    }
    visitJsxAttributes(node: ast.JsxAttributes, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJsxOpeningFragment(node: ast.JsxOpeningFragment, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJsxClosingFragment(node: ast.JsxClosingFragment, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJsxFragment(node: ast.JsxFragment, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJsxSelfClosingElement(node: ast.JsxSelfClosingElement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJsxOpeningElement(node: ast.JsxOpeningElement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJsxClosingElement(node: ast.JsxClosingElement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJsxElement(node: ast.JsxElement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitMetaProperty(node: ast.MetaProperty, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitArrayLiteralExpression(node: ast.ArrayLiteralExpression, context?: any) {
        const { elements } = node.toJson(this, context);
        return elements;
    }
    visitParenthesizedExpression(node: ast.ParenthesizedExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitTemplateHead(node: ast.TemplateHead, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitTemplateExpression(node: ast.TemplateExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitTemplateSpan(node: ast.TemplateSpan, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitTemplateMiddle(node: ast.TemplateMiddle, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitFunctionExpression(node: ast.FunctionExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitTemplateTail(node: ast.TemplateTail, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitThisExpression(node: ast.ThisExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitSuperExpression(node: ast.SuperExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitImportExpression(node: ast.ImportExpression, context?: any) {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
    visitNonNullExpression(node: ast.NonNullExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitPostfixUnaryExpression(node: ast.PostfixUnaryExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitPrefixUnaryExpression(node: ast.PrefixUnaryExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitDeleteExpression(node: ast.DeleteExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitTypeOfExpression(node: ast.TypeOfExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitVoidExpression(node: ast.VoidExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitAwaitExpression(node: ast.AwaitExpression, context?: any) {
        const { expression } = node.toJson(this, context);
        return expression;
    }
    visitTypeAssertion(node: ast.TypeAssertion, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitCommaListExpression(node: ast.CommaListExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJsxExpression(node: ast.JsxExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitAsExpression(node: ast.AsExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitNewExpression(node: ast.NewExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitSpreadElement(node: ast.SpreadElement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitConditionalExpression(node: ast.ConditionalExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitElementAccessExpression(node: ast.ElementAccessExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitOmittedExpression(node: ast.OmittedExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitYieldExpression(node: ast.YieldExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitSyntheticExpression(node: ast.SyntheticExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitPropertyAccessExpression(node: ast.PropertyAccessExpression, context?: any) {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
    visitHeritageClause(node: ast.HeritageClause, context?: any) {
        const { token, types } = node.toJson(this, context);
        return { token, types };
    }
    visitExpressionWithTypeArguments(node: ast.ExpressionWithTypeArguments, context?: any) {
        const { expression } = node.toJson(this, context);
        return expression;
    }
    visitJSDocVariadicType(node: ast.JSDocVariadicType, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJSDocNonNullableType(node: ast.JSDocNonNullableType, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJSDocNullableType(node: ast.JSDocNullableType, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitTypeOperatorNode(node: ast.TypeOperatorNode, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitTypeParameterDeclaration(node: ast.TypeParameterDeclaration, context?: any) {
        const { name, constraint, default: _def, expression } = node.toJson(this, context);
    }
    visitMappedTypeNode(node: ast.MappedTypeNode, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitTypePredicateNode(node: ast.TypePredicateNode, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitThisTypeNode(node: ast.ThisTypeNode, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitExternalModuleReference(node: ast.ExternalModuleReference, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitNamedExports(node: ast.NamedExports, context?: any) {
        const { elements } = node.toJson(this, context);
        return elements;
    }
    visitExportDeclaration(node: ast.ExportDeclaration, context: CompilerContext) {
        const { exportClause, moduleSpecifier } = node.toJson(this, context);
        // const sourceFilePath = this.transformPath(moduleSpecifier.value, context)
        // const sourceFile = context.getSourceFile(sourceFilePath);
        // if (sourceFile) {
        //     const ctx = new CompilerContext(context);
        //     this.visitSourceFile(sourceFile, ctx);
        //     context.addChildren(moduleSpecifier.value, ctx)
        // };
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
        throw new Error("Method not implemented.");
    }
    visitEnumMember(node: ast.EnumMember, context?: any) {
        const { name, initializer } = node.toJson(this, context);
        const ast = new graphql.EnumValueDefinitionNode();
        ast.name = name;
        return ast;
    }
    visitModuleDeclaration(node: ast.ModuleDeclaration, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitImportEqualsDeclaration(node: ast.ImportEqualsDeclaration, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitFunctionDeclaration(node: ast.FunctionDeclaration, context?: any) {
        const { name } = node.toJson(this, context);
        return;
    }
    visitJSDocFunctionType(node: ast.JSDocFunctionType, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitFunctionTypeNode(node: ast.FunctionTypeNode, context?: any) {
        const { name, type, typeArguments, parameters } = node.toJson(this, context);
    }
    visitConstructorTypeNode(node: ast.ConstructorTypeNode, context: any) {
        throw new Error("Method not implemented.");
    }
    visitIndexSignatureDeclaration(node: ast.IndexSignatureDeclaration, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitMethodSignature(node: ast.MethodSignature, context?: any) {
        const { name, type, parameters, typeParameters, questionToken } = node.toJson(this, context);
    }
    visitConstructSignatureDeclaration(node: ast.ConstructSignatureDeclaration, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitCallSignatureDeclaration(node: ast.CallSignatureDeclaration, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitArrowFunction(node: ast.ArrowFunction, context?: any) {
        return () => { };
    }
    visitTypeAliasDeclaration(node: ast.TypeAliasDeclaration, context?: any) {
        const { name, type, typeParameters } = node.toJson(this, context);
        const ast = new graphql.UnionTypeDefinitionNode();
        ast.name = name;
        ast.types = type;
        return ast;
    }
    visitEnumDeclaration(node: ast.EnumDeclaration, context: CompilerContext) {
        const { name, members } = node.toJson(this, context);
        const ast = new graphql.EnumTypeDefinitionNode();
        ast.name = name;
        ast.values = members;
        return ast;
    }
    visitPropertyAccessEntityNameExpression(node: ast.PropertyAccessEntityNameExpression, context: CompilerContext) {
        const { expression, name } = node.toJson(this, context);
        return name ? name : expression;
    }
    visitJSDocSignature(node: ast.JSDocSignature, context: CompilerContext) {
        throw new Error("Method not implemented.");
    }
    visitJSDocCallbackTag(node: ast.JSDocCallbackTag, context: CompilerContext) {
        throw new Error("Method not implemented.");
    }
    visitJSDocTypeExpression(node: ast.JSDocTypeExpression, context: CompilerContext) {
        const { type } = node.toJson(this, context);
        return type;
    }
    visitJSDocTemplateTag(node: ast.JSDocTemplateTag, context: CompilerContext) {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
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
    private serializeClass(symbol: ts.Symbol, context: CompilerContext) {
        let details = this.serializeSymbol(symbol, context);
        let constructorType = context.typeChecker.getTypeOfSymbolAtLocation(
            symbol,
            symbol.valueDeclaration!
        );
        details.constructors = constructorType
            .getConstructSignatures()
            .map((it) => this.serializeSignature(it, context));
        return details;
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
        throw new Error("Method not implemented.");
    }
    visitJSDocPropertyTag(node: ast.JSDocPropertyTag, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJSDocTypedefTag(node: ast.JSDocTypedefTag, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitTypeLiteralNode(node: ast.TypeLiteralNode, context?: any) {
        const { members } = node;
    }
    visitPropertySignature(node: ast.PropertySignature, context?: any) {
        const { name, type, questionToken, initializer, jsDoc } = node.toJson(this, context);
        const ast = new graphql.FieldDefinitionNode();
        ast.name = name;
        ast.type = questionToken ? type : new graphql.NonNullTypeNode(type);
        if (jsDoc) ast.description = this.mergeJsDoc(jsDoc.flat());
        return ast;
    }
    visitInterfaceDeclaration(node: ast.InterfaceDeclaration, context: CompilerContext) {
        const { members, name, typeParameters, heritageClauses, type, questionToken } = node.toJson(this, context);
        const ast = new graphql.InterfaceTypeDefinitionNode();
        ast.name = name;
        ast.fields = members;
        if (heritageClauses) {
            ast.interfaces = [];
            heritageClauses.map((it: any) => {
                if (it.token === ts.SyntaxKind.ExtendsKeyword) {
                    throw new Error(`interface to graphql do not support extends`)
                }
            })
        }
        return ast;
    }
    visitNoSubstitutionTemplateLiteral(node: ast.NoSubstitutionTemplateLiteral, context?: any) {
        const { text, rawText } = node;
        return new graphql.StringValueNode(rawText ? rawText : text);
    }
    visitGetAccessorDeclaration(node: ast.GetAccessorDeclaration, context?: any) {
        throw new Error("Method not implemented.");
    }
    visit(node?: ast.Node | undefined, context?: any): any {
        return node && node.visit(this, context)
    }
    visits(nodes?: ast.Node[] | undefined, context?: any) {
        return nodes ? nodes.map(it => this.visit(it, context)) : [];
    }
    visitSourceFile(node: ast.SourceFile, context: CompilerContext) {
        context.setSourceFile(node);
        node.statements.filter(it => {
            if (it instanceof ast.ExpressionStatement) {
                it.visit(this, context)
            }
        });
    }
    visitClassDeclaration(node: ast.ClassDeclaration, context?: any) {
        // class 转 type
        const { modifiers, name, members, decorators, heritageClauses } = node.toJson(this, context);
        if (hasModuleDecorator(decorators)) {
            
        }
        if (Array.isArray(decorators)) {

            const moduleDecorator = decorators.find(it => it && it.name.value === 'Module')
            if (['Module'].some(key => decorators.filter(it => !!it).map((it: any) => it.name.value).includes(key))) {
                // 解析Module
                debugger;
            }
            const scalarDecorator = decorators.filter(it => !!it).find(it => it.name.value === 'Scalar');
            if (scalarDecorator) {
                const scalar = new graphql.ScalarTypeDefinitionNode();
                const args = scalarDecorator.arguments.find((it: any) => it.name.value === 'name')
                if (args) {
                    scalar.name = new graphql.NameNode(args.value.value);
                }
                return scalar;
            }
        }
        if (Array.isArray(decorators)) {
            const needDecorators = ['Controller', 'Magnus'];
            if (needDecorators.some(key => decorators.filter(it => !!it).map((it: any) => it.name.value).includes(key))) {
                const ast = new graphql.ObjectTypeDefinitionNode();
                ast.name = name;
                ast.fields = members;
                ast.directives = decorators.filter((it: any) => !!it).filter(it => !needDecorators.some(key => it.name.value === key));
                if (modifiers.includes('export')) {
                    context.setExport(name.value, node)
                }
                if (heritageClauses) {
                    ast.interfaces = [];
                    heritageClauses.map((it: any) => {
                        if (it.token === ts.SyntaxKind.ImplementsKeyword) {
                            it.types.map((type: any) => {
                                if (Array.isArray(ast.interfaces)) {
                                    ast.interfaces.push(type)
                                }
                            })
                        }
                    })
                }
                return ast;
            }
        }
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
        ast.directives = decorators;
        if (jsDoc) ast.description = this.mergeJsDoc(jsDoc.flat());
        return ast;
    }
    visitTypeReferenceNode(node: ast.TypeReferenceNode, context?: any) {
        const { typeName, typeArguments } = node.toJson(this, context);
        const ast = new graphql.NamedTypeNode();
        if (typeName) {
            if (typeName.value === 'Promise') {
                ast.name = typeArguments[0]
            } else if (typeName.value === 'AsyncIterator') {
                ast.name = typeArguments[0]
            } else if (typeName.value === 'Observable') {
                ast.name = typeArguments[0]
            } else {
                ast.name = typeName;
            }
        }
        return ast;
    }
    visitQualifiedName(node: ast.QualifiedName, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitIdentifier(node: ast.Identifier, context: CompilerContext) {
        const ast = new graphql.NameNode();
        ast.__type = context.typeChecker.getTypeAtLocation(node.__node);
        ast.__node = node.__node;
        ast.value = node.escapedText;
        return ast;
    }
    visitKeywordTypeNode(node: ast.KeywordTypeNode, context?: any) {
        const { keyword } = node;
        const ast = new graphql.NameNode();
        switch (keyword) {
            case 'string':
                ast.value = 'String';
                break;
            case 'any':
                ast.value = 'Json';
                break;
            case 'number':
                ast.value = 'Int';
                break;
            case 'void':
                ast.value = 'Void';
                break;
            default:
                debugger;
                return ast.value = `Json`;
        }
        return ast;
    }
    visitConstructorDeclaration(node: ast.ConstructorDeclaration, context?: any) {
        const { } = node.toJson(this, context, 'body');
    }
    visitExpressionStatement(node: ast.ExpressionStatement, context?: any) {
        const { expression } = node.toJson(this, context);
        return expression;
    }
    visitCallExpression(node: ast.CallExpression, context: CompilerContext) {
        const { expression, arguments: args } = node.toJson(this, context);
        const type = expression.__type;
        const ast = context.create(type.symbol.valueDeclaration);
        // call expression
        if (args) {
            args.map((arg: any) => {
                if (arg.__type) {
                    const type = arg.__type;
                    const ast = context.create(type.symbol.valueDeclaration);
                    if (ast) ast.visit(this, context)
                }
            })
        }
        if (ast) ast.visit(this, context);
        return { expression, args };
    }
    visitBlock(node: ast.Block, context?: any) {
        const { statements } = node.toJson(this, context);
        return statements;
    }
    visitJSDocOptionalType(node: ast.JSDocOptionalType, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitExportAssignment(node: ast.ExportAssignment, context?: any) {
        throw new Error("Method not implemented.");
    }
}