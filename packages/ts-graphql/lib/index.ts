import * as ts from 'typescript';
import { PlainModuleRef } from '@nger/plain';
import * as ast from '@nger/ast.ts';

export class CompilerHelper {

}
export class CompilerContext {
    typeChecker: ts.TypeChecker;
    locals: Map<string, ts.Symbol>;
    moduleRef: PlainModuleRef<any>;
    helper: CompilerHelper;
    program: ts.Program;
    sourceFile: ast.SourceFile;
    constructor(program: ts.Program) {
        this.program = program;
        this.typeChecker = program.getTypeChecker();
        this.moduleRef = ast.moduleRef;
    }
    setLocals(locals: Map<string, ts.Symbol>) {
        this.locals = locals;
    }
    setSourceFile(node: ast.SourceFile) {
        this.sourceFile = node;
    }
    getTypeBySymbol(symbol: ts.Symbol) {
        const symbolObject = Reflect.get(symbol, 'exportSymbol');
        if (symbolObject) {
            Reflect.set(symbolObject, 'kind', 999);
            Reflect.set(symbol, 'exportSymbol', symbolObject);
        }
        Reflect.set(symbol, 'kind', 999);
        return this.moduleRef.create<ast.Symbol>(symbol, 'kind')
    }
    getTypeByName(name: string): ast.Symbol | undefined {
        const symbol = this.locals && this.locals.get(name);
        if (symbol) return this.getTypeBySymbol(symbol);
    }
}
export class CompilerVisitor implements ast.Visitor {
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
        throw new Error("Method not implemented.");
    }
    visitImportSpecifier(node: ast.ImportSpecifier, context?: any) {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
    visitVariableStatement(node: ast.VariableStatement, context?: any) {
        throw new Error("Method not implemented.");
    }
    visitVariableDeclaration(node: ast.VariableDeclaration, context?: any) {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
    visitImportDeclaration(node: ast.ImportDeclaration, context: CompilerContext) {
        this.visit(node.moduleSpecifier, context)
        debugger;
        throw new Error("Method not implemented.");
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
        const { } = node;
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
    visitBooleanLiteral(node: ast.BooleanLiteral, context?: any) {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }
    visitNumericLiteral(node: ast.NumericLiteral, context?: any) {
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
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
    visit(node?: ast.Node, context?: CompilerContext): any {
        return node && node.visit(this, context);
    }
    visits(nodes?: ast.Node[], context?: any): any {
        return nodes && nodes.map(node => node.visit(this, context))
    }
    visitSourceFile(node: ast.SourceFile, context: CompilerContext) {
        const _context = new CompilerContext(context.program);
        _context.setLocals(node.locals);
        _context.setSourceFile(node)
        node.statements.map(it => this.visit(it, _context));
    }
    visitClassDeclaration(node: ast.ClassDeclaration, context: CompilerContext) {
        node.members.map(member => this.visit(member, context))
    }
    visitPropertyDeclaration(node: ast.PropertyDeclaration, context: CompilerContext): any {
        const { type, name } = node;
        if (type) {
            if (type instanceof ast.TypeReferenceNode) {
                const name = this.visit(type.typeName, context);
                const typeArguments = this.visits(type.typeArguments, context)
                const typeNode = context.getTypeByName(name);
                if (typeNode) {
                    const node = typeNode.valueDeclaration;
                    const val = {
                        typeArguments,
                        node
                    }
                    debugger;
                }
            }
        }
    }
    visitIdentifier(node: ast.Identifier, context: CompilerContext) {
        const type = context.getTypeByName(node.escapedText);
        if (type) {
            if (type.exportSymbol) {
                this.visit(type.exportSymbol.valueDeclaration, context);
            }
        }
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
        this.visit(node.expression, context);
    }
    visitCallExpression(node: ast.CallExpression, context: CompilerContext) {
        this.visit(node.expression, context)
    }
    visitBlock(node: ast.Block, context: CompilerContext) {
        node.statements.map(it => this.visit(it, context))
    }
    visitJSDocOptionalType(node: ast.JSDocOptionalType, context: CompilerContext) {
        debugger;
    }
    visitExportAssignment(node: ast.ExportAssignment, context: CompilerContext) {
        debugger;
    }
}