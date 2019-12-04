import * as ast from '@nger/ast_ts';
import { CompilerContext } from './compiler';
import * as ts from 'typescript';
export class ToStringVisitor implements ast.Visitor {
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
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
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
    visit(node?: ast.Node, context?: CompilerContext): any {
        return node && node.visit(this, context);
    }
    visits(nodes?: ast.Node[], context?: any): any {
        return nodes && nodes.map(node => node.visit(this, context))
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
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
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
        return `{ ${elements.join(', ')} }`
    }
    visitImportSpecifier(node: ast.ImportSpecifier, context?: any) {
        const { kind, propertyName, name } = node.toJson(this, context);
        return name;
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
        throw new Error("Method not implemented.");
    }
    visitBindingElement(node: ast.BindingElement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitVariableDeclarationList(node: ast.VariableDeclarationList, context?: any) {
        const { declarations, flags } = node.toJson(this, context)
        return declarations.join('\n');
    }
    visitVariableStatement(node: ast.VariableStatement, context?: any) {
        const { declarationList, flags, modifiers, decorators } = node.toJson(this, context);
        return `${declarationList}`;
    }
    visitVariableDeclaration(node: ast.VariableDeclaration, context?: any) {
        const { name, exclamationToken, type, initializer, flags, modifiers } = node.toJson(this, context);
        return `const ${name}${exclamationToken ? '!' : ''}${type ? `:${type}` : ''}${initializer ? ` = ${initializer}` : ''}`
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
        return `return ${expression}`;
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
    visitImportClause(node: ast.ImportClause, context?: any) {
        const { name, namedBindings } = node.toJson(this, context);
        return `${name ? name : namedBindings}`
    }
    visitImportDeclaration(node: ast.ImportDeclaration, context: CompilerContext) {
        const { moduleSpecifier, importClause } = node.toJson(this, context);
        return `import ${importClause} from '${moduleSpecifier}'`
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
        const { kind, text, isUnterminated, hasExtendedUnicodeEscape } = node;
        return text;
    }
    visitJsxAttribute(node: ast.JsxAttribute, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitObjectLiteralExpression(node: ast.ObjectLiteralExpression, context?: any) {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
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
        debugger;
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
        return `import`;
    }
    visitNullLiteral(node: ast.NullLiteral, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitBooleanLiteral(node: ast.BooleanLiteral, context?: any) {
        return `boolean`
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
        const { expression } = node.toJson(this, context);
        return `delete ${expression}`
    }
    visitTypeOfExpression(node: ast.TypeOfExpression, context?: any) {
        const { expression } = node.toJson(this, context);
        return `typeof ${expression}`
    }
    visitVoidExpression(node: ast.VoidExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitAwaitExpression(node: ast.AwaitExpression, context?: any) {
        const { expression } = node.toJson(this, context);
        return `await ${expression}`
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
        debugger;
    }
    visitBigIntLiteral(node: ast.BigIntLiteral, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitNumericLiteral(node: ast.NumericLiteral, context?: any) {
        return node.text;
    }
    visitSemicolonClassElement(node: ast.SemicolonClassElement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitHeritageClause(node: ast.HeritageClause, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitExpressionWithTypeArguments(node: ast.ExpressionWithTypeArguments, context?: any) {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
    visitExportDeclaration(node: ast.ExportDeclaration, context?: any) {
        debugger;
    }
    visitExportSpecifier(node: ast.ExportSpecifier, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitEndOfFileToken(node: ast.EndOfFileToken, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitEnumMember(node: ast.EnumMember, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitModuleDeclaration(node: ast.ModuleDeclaration, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitImportEqualsDeclaration(node: ast.ImportEqualsDeclaration, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitFunctionDeclaration(node: ast.FunctionDeclaration, context?: any) {
        const { name, body, modifiers, flags, asteriskToken, questionToken, exclamationToken, typeParameters, parameters, type } = node.toJson(this, context);
        return `${modifiers.join(' ')} function ${name}(${parameters.join(', ')})${body}`
    }
    visitModifier(node: ast.Modifier, context?: any) {
        switch (node.kind) {
            case ts.SyntaxKind.AbstractKeyword:
                return 'abstract';
            case ts.SyntaxKind.AsyncKeyword:
                return 'async';
            case ts.SyntaxKind.ConstKeyword:
                return 'const';
            case ts.SyntaxKind.DeclareKeyword:
                return 'declare';
            case ts.SyntaxKind.DeclareKeyword:
                return 'declare';
            case ts.SyntaxKind.DefaultKeyword:
                return `default`;
            case ts.SyntaxKind.ExportKeyword:
                return `export`;
            case ts.SyntaxKind.PublicKeyword:
                return `public`;
            case ts.SyntaxKind.PrivateKeyword:
                return `private`;
            case ts.SyntaxKind.ProtectedKeyword:
                return `protected`;
            case ts.SyntaxKind.ReadonlyKeyword:
                return 'readonly';
            case ts.SyntaxKind.StaticKeyword:
                return `static`;
            default:
                throw new Error(`unknow type`)
        }
    }
    visitJSDocFunctionType(node: ast.JSDocFunctionType, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitFunctionTypeNode(node: ast.FunctionTypeNode, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitConstructorTypeNode(node: ast.ConstructorTypeNode, context: any) {
        throw new Error("Method not implemented.");
    }
    visitIndexSignatureDeclaration(node: ast.IndexSignatureDeclaration, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitMethodSignature(node: ast.MethodSignature, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitConstructSignatureDeclaration(node: ast.ConstructSignatureDeclaration, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitCallSignatureDeclaration(node: ast.CallSignatureDeclaration, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitArrowFunction(node: ast.ArrowFunction, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitTypeAliasDeclaration(node: ast.TypeAliasDeclaration, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitEnumDeclaration(node: ast.EnumDeclaration, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitPropertyAccessEntityNameExpression(node: ast.PropertyAccessEntityNameExpression, context?: any) {
        const { name, expression, questionDotToken } = node.toJson(this, context);
        return `${expression}${questionDotToken ? '?' : ''}.${name}`
    }
    visitJSDocSignature(node: ast.JSDocSignature, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJSDocCallbackTag(node: ast.JSDocCallbackTag, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJSDocTypeExpression(node: ast.JSDocTypeExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJSDocTemplateTag(node: ast.JSDocTemplateTag, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJSDocParameterTag(node: ast.JSDocParameterTag, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJSDocReturnTag(node: ast.JSDocReturnTag, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitClassExpression(node: ast.ClassExpression, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitDecorator(node: ast.Decorator, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJSDoc(node: ast.JSDoc, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitJSDocTag(node: ast.JSDocTag, context?: any) {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
    visitPropertySignature(node: ast.PropertySignature, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitInterfaceDeclaration(node: ast.InterfaceDeclaration, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitNoSubstitutionTemplateLiteral(node: ast.NoSubstitutionTemplateLiteral, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitGetAccessorDeclaration(node: ast.GetAccessorDeclaration, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitSourceFile(node: ast.SourceFile, context: CompilerContext) {
        const _context = new CompilerContext(context);
        _context.setSourceFile(node)
        if (node) {
            const { statements } = node.toJson(this, context);
            return statements.join('\n');
        }
        return ``;
    }
    visitClassDeclaration(node: ast.ClassDeclaration, context: CompilerContext) {
        debugger;
    }
    visitPropertyDeclaration(node: ast.PropertyDeclaration, context: CompilerContext): any {
        debugger;
    }
    visitIdentifier(node: ast.Identifier, context: CompilerContext) {
        const { escapedText, originalKeywordKind, isInJSDocNamespace } = node;
        return escapedText;
    }
    visitQualifiedName(node: ast.QualifiedName, context: CompilerContext) {
        debugger;
    }
    visitTypeReferenceNode(node: ast.TypeReferenceNode, context: CompilerContext) {
        debugger;
    }
    visitKeywordTypeNode(node: ast.KeywordTypeNode, context?: CompilerContext): any {
        return node.keyword;
    }
    visitConstructorDeclaration(node: ast.ConstructorDeclaration, context?: CompilerContext) {
        debugger;
    }
    visitExpressionStatement(node: ast.ExpressionStatement, context: CompilerContext): any {
        const { expression } = node.toJson(this, context);
        return `${expression}`;
    }
    visitCallExpression(node: ast.CallExpression, context: CompilerContext) {
        const { expression, questionDotToken, typeArguments, arguments: args } = node.toJson(this, context);
        return `${expression}(${args.join(', ')})`
    }
    visitBlock(node: ast.Block, context: CompilerContext) {
        const { statements } = node.toJson(this, context);
        return `{\n\t${statements.join(';\n\t')}\t\n}`
    }
    visitJSDocOptionalType(node: ast.JSDocOptionalType, context: CompilerContext) {
        debugger;
    }
    visitExportAssignment(node: ast.ExportAssignment, context: CompilerContext) {
        debugger;
    }
}